import Donate from "../models/Donate.js";
import logger from "../utils/logger.js";

export const getDonatesByDonor = async (donor_wallet) => {
  return Donate.find({ donor_wallet: donor_wallet.toLowerCase() }).sort({
    timestamp: -1,
  });
};

export const getDonatesByProject = async (project_id) => {
  return Donate.find({ project_id: project_id.toLowerCase() }).sort({
    timestamp: -1,
  });
};

export const createDonate = async (data) => {
  try {
    const doc = {
      donor_wallet: data.from_address?.toString().toLowerCase() ?? null,
      donateType: data.donateType ?? "direct",
      project_id: data.projectId?.toString().toLowerCase() ?? null,
      amount: data.amount?.toString() ?? null,
      timestamp: new Date(),
    };

    // Upsert theo tx_hash
    const result = await Donate.findOneAndUpdate(
      { tx_hash: data.txHash ?? `nohash_${Date.now()}` }, // điều kiện unique
      { $set: doc },
      { new: true, upsert: true } // nếu chưa có thì tạo mới
    );

    logger.info(`Saved/Updated donate: ${result.tx_hash}`);
    return result;
  } catch (err) {
    logger.error("Failed to save donate:", err);
    throw err;
  }
};
export const getAllDonates = async () => {
  return Donate.find().sort({ timestamp: -1 });
};