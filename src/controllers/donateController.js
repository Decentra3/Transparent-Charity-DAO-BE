// controllers/donateController.js
import * as donateService from "../services/donateService.js";

/**
 * GET /donates
 * Lấy tất cả donate
 */
export const getAllDonates = async (req, res, next) => {
  try {
    const donates = await donateService.getAllDonates();
    return res.json({
      success: true,
      data: donates,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /donates/donor/:donor_wallet
 * Lấy donate theo donor_wallet
 */
export const getDonatesByDonor = async (req, res, next) => {
  try {
    const { donor_wallet } = req.params;

    if (!donor_wallet) {
      return res.status(400).json({
        success: false,
        message: "donor_wallet is required",
      });
    }

    const donates = await donateService.getDonatesByDonor(
      donor_wallet.toLowerCase().trim()
    );

    return res.json({
      success: true,
      data: donates,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /donates/project/:project_id
 * Lấy donate theo project_id
 */
export const getDonatesByProject = async (req, res, next) => {
  try {
    const { project_id } = req.params;

    if (!project_id) {
      return res.status(400).json({
        success: false,
        message: "project_id is required",
      });
    }

    const donates = await donateService.getDonatesByProject(
      project_id.toLowerCase().trim()
    );

    return res.json({
      success: true,
      data: donates,
    });
  } catch (err) {
    next(err);
  }
};