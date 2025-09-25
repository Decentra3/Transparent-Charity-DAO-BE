import Donate from "../models/Donate.js";
import logger from "../utils/logger.js";

// Lấy donate theo donor_wallet
export const getDonatesByDonor = async (donor_wallet) => {
  return Donate.find({ donor_wallet: donor_wallet.toLowerCase() }).sort({
    timestamp: -1,
  });
};

// Lấy donate theo project_id
export const getDonatesByProject = async (project_id) => {
  return Donate.find({ project_id }).sort({ timestamp: -1 });
};

export const createDonate = async (data) => {
  try {
    const doc = {
      donor_wallet: data.from_address?.toLowerCase() ?? null,
      donateType: data.donateType ?? "direct",
      project_id: data.projectId ?? null,
      amount: data.amount ?? null,
      tx_hash: data.txHash ?? `nohash_${Date.now()}`,
      timestamp: new Date(),
    };
    const result = await Donate.create(doc);
    logger.info(`Saved donate: ${doc.tx_hash}`);
    return result;
  } catch (err) {
    logger.error("Failed to save donate:", err);
    throw err;
  }
};
