import logger from "../../utils/logger.js";
import { emitError } from "./errorHandler.js";
import { upsertTransaction } from "../../services/transactionService.js";
import { createDonate } from "../../services/donateService.js"; // import hàm createDonate
import { ethers } from "ethers";

// ABI chỉ cần function liên quan đến donate/projectDonate
const donationABI = [
  "function donate(uint256 projectId) payable",
  "function projectDonate(uint256 projectId) payable",
];

// ethers v6
const iface = new ethers.Interface(donationABI);

export function subscribeEvents(contract, io) {
  const events = [
    {
      name: "DonationReceived",
      handler: async (donor, amount, rawEvent) => {
        const tx = await rawEvent.getTransaction();
        let projectId = null;

        try {
          if (tx.data) {
            const decoded = iface.parseTransaction({
              data: tx.data,
              value: tx.value,
            });
            logger.debug("===== DonationReceived decoded =====");
            logger.debug("decoded.args:", decoded.args);
            logger.debug("tx.value (wei):", tx.value.toString());
            logger.debug("tx.data:", tx.data);
            logger.debug("from:", tx.from, "to:", tx.to);

            projectId = decoded.args.projectId
              ? Number(decoded.args.projectId.toString())
              : null;
          }
        } catch {}

        return {
          donor,
          amount: amount.toString(),
          projectId,
          txHash: tx.hash,
          eventType: "donate",
          groupEvent: "donationReceived",
          from_address: tx.from,
          to_address: tx.to,
        };
      },
      isDonate: true,
    },
    {
      name: "ProjectDonation",
      handler: async (projectIdParam, donor, amount, rawEvent) => {
        const tx = await rawEvent.getTransaction();
        let projectId = projectIdParam
          ? Number(projectIdParam.toString())
          : null;

        try {
          if (!projectId && tx.data) {
            const decoded = iface.parseTransaction({
              data: tx.data,
              value: tx.value,
            });
            projectId = decoded.args.projectId
              ? Number(decoded.args.projectId.toString())
              : null;
          }
        } catch {}

        return {
          donor,
          amount: amount.toString(),
          projectId,
          txHash: tx.hash,
          eventType: "donate",
          groupEvent: "projectUpdate",
          from_address: tx.from,
          to_address: tx.to,
        };
      },
      isDonate: true,
    },
    {
      name: "RequestCreated",
      handler: async (id, beneficiary, amount, rawEvent) => {
        const tx = await rawEvent.getTransaction();
        return {
          requestId: id.toString(),
          beneficiary,
          amount: amount.toString(),
          txHash: tx.hash,
          eventType: "request",
          groupEvent: "requestUpdate",
          from_address: tx.from,
          to_address: tx.to,
        };
      },
    },
    {
      name: "VoteCast",
      handler: async (requestId, voter, decision, rawEvent) => {
        const tx = await rawEvent.getTransaction();
        return {
          requestId: requestId.toString(),
          voter,
          decision,
          txHash: tx.hash,
          eventType: "vote",
          groupEvent: "requestUpdate",
          from_address: tx.from,
          to_address: tx.to,
        };
      },
    },
    {
      name: "PayoutSuccess",
      handler: async (requestId, beneficiary, amount, rawEvent) => {
        const tx = await rawEvent.getTransaction();
        return {
          requestId: requestId.toString(),
          beneficiary,
          amount: amount.toString(),
          txHash: tx.hash,
          eventType: "payout",
          groupEvent: "requestUpdate",
          from_address: tx.from,
          to_address: tx.to,
        };
      },
    },
    {
      name: "RequestRejected",
      handler: async (requestId, rawEvent) => {
        const tx = await rawEvent.getTransaction();
        return {
          requestId: requestId.toString(),
          txHash: tx.hash,
          eventType: "request_reject",
          groupEvent: "requestUpdate",
          from_address: tx.from,
          to_address: tx.to,
        };
      },
    },
    {
      name: "ProjectCreated",
      handler: async (projectId, owner, title, rawEvent) => {
        const tx = await rawEvent.getTransaction();
        return {
          projectId: Number(projectId.toString()),
          owner,
          title,
          txHash: tx.hash,
          eventType: "project",
          groupEvent: "projectUpdate",
          from_address: tx.from,
          to_address: tx.to,
        };
      },
    },
    {
      name: "ProjectVoteCast",
      handler: async (projectId, voter, decision, rawEvent) => {
        const tx = await rawEvent.getTransaction();
        return {
          projectId: Number(projectId.toString()),
          voter,
          decision,
          txHash: tx.hash,
          eventType: "project_vote",
          groupEvent: "projectUpdate",
          from_address: tx.from,
          to_address: tx.to,
        };
      },
    },
    {
      name: "ProjectApproved",
      handler: async (projectId, rawEvent) => {
        const tx = await rawEvent.getTransaction();
        return {
          projectId: Number(projectId.toString()),
          txHash: tx.hash,
          eventType: "project_approve",
          groupEvent: "projectUpdate",
          from_address: tx.from,
          to_address: tx.to,
        };
      },
    },
    {
      name: "ProjectRejected",
      handler: async (projectId, rawEvent) => {
        const tx = await rawEvent.getTransaction();
        return {
          projectId: Number(projectId.toString()),
          txHash: tx.hash,
          eventType: "project_reject",
          groupEvent: "projectUpdate",
          from_address: tx.from,
          to_address: tx.to,
        };
      },
    },
    {
      name: "ProjectClosed",
      handler: async (projectId, totalFunded, rawEvent) => {
        const tx = await rawEvent.getTransaction();
        return {
          projectId: Number(projectId.toString()),
          totalFunded: totalFunded.toString(),
          txHash: tx.hash,
          eventType: "project_close",
          groupEvent: "projectUpdate",
          from_address: tx.from,
          to_address: tx.to,
        };
      },
    },
    {
      name: "DaoMemberAdded",
      handler: async (newMember, addedBy, rawEvent) => {
        const tx = await rawEvent.getTransaction();
        return {
          newMember,
          addedBy,
          txHash: tx.hash,
          eventType: "dao_member",
          groupEvent: "daoUpdate",
          from_address: tx.from,
          to_address: tx.to,
        };
      },
    },
  ];

  // Đăng ký tất cả event
  events.forEach(({ name, handler, isDonate }) => {
    contract.on(name, async (...args) => {
      const rawEvent = args[args.length - 1];
      try {
        const data = await handler(...args);
        await handleAndEmit(io, data.groupEvent, data);

        // Nếu event donate, lưu riêng vào collection Donate
        if (isDonate) {
          await createDonate({
            from_address: data.from_address,
            projectId: data.projectId,
            amount: data.amount,
            txHash: data.txHash,
            donateType: "direct", // hoặc lấy từ data nếu có
          });
        }
      } catch (err) {
        emitError(io, name, err);
      }
    });
  });
}

// Lưu vào DB và emit event qua socket (tổng transaction)
async function handleAndEmit(io, groupEvent, data) {
  try {
    const txDoc = {
      tx_hash: data.txHash ?? `nohash_${Date.now()}`,
      from_address: data.from_address ?? null,
      to_address: data.to_address ?? null,
      amount: data.amount ?? null,
      event_type: data.eventType,
      project_id: data.projectId ?? null,
      request_id: data.requestId ?? null,
      block_number: data.blockNumber ?? null,
      timestamp: new Date(),
    };

    await upsertTransaction(txDoc);
    logger.info(`Saved transaction for event ${groupEvent}: ${txDoc.tx_hash}`);
    io.emit(groupEvent, data);
  } catch (err) {
    emitError(io, groupEvent, err);
  }
}
