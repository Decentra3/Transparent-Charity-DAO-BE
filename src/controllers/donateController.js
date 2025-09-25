import * as donateService from "../services/donateService.js";

// GET /donates/donor/:donor_wallet
export const getDonatesByDonor = async (req, res, next) => {
  try {
    const { donor_wallet } = req.params;

    if (!donor_wallet) {
      return res.status(400).json({ message: "donor_wallet is required" });
    }

    const donates = await donateService.getDonatesByDonor(donor_wallet);
    return res.json(donates);
  } catch (err) {
    next(err);
  }
};

// GET /donates/project/:project_id
export const getDonatesByProject = async (req, res, next) => {
  try {
    const { project_id } = req.params;

    if (!project_id) {
      return res.status(400).json({ message: "project_id is required" });
    }

    const donates = await donateService.getDonatesByProject(project_id);
    return res.json(donates);
  } catch (err) {
    next(err);
  }
};
