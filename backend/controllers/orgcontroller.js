const Organisations = require('../models/organisation');
const { deleteFromCloudinary } = require('../middlewares/upload'); // ✅ fixed path
const Organization = require('../models/organisation');
exports.getAllOrganisations = async (req, res) => {
  try {
    const organisations = await Organisations.findAll();
    res.json(organisations);
  } catch (error) {
    console.error('Error fetching organisations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getOrganisationById = async (req, res) => {
  try {
    const organisation = await Organisations.findByPk(req.params.id);
    if (!organisation) {
      return res.status(404).json({ error: 'Organisation not found' });
    }
    res.json(organisation);
  } catch (error) {
    console.error('Error fetching organisation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



exports.createOrganisation = async (req, res) => {
  try {
    let { name, slug, ...rest } = req.body;

    if (!slug) slug = name;

    slug = slug
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')  
      .replace(/--+/g, '-')         
      .replace(/^-+|-+$/g, '');    

    const organisation = await Organization.create({ name, slug, ...rest });
    res.status(201).json(organisation);
  } catch (err) {
    console.error('Error creating organisation:', err);
    res.status(400).json({ error: err.message });
  }
};


exports.updateOrganisation = async (req, res) => {
  try {
    const org = await Organisations.findByPk(req.params.id);
    if (!org) return res.status(404).json({ error: 'Organisation not found' });
    await org.update(req.body);
    res.json(org);
  } catch (error) {
    console.error('Error updating organisation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteOrganisation = async (req, res) => {
  try {
    const org = await Organisations.findByPk(req.params.id);
    if (!org) return res.status(404).json({ error: 'Organisation not found' });
    await org.destroy();
    res.json({ message: 'Organisation deleted successfully' });
  } catch (error) {
    console.error('Error deleting organisation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.uploadLogo = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const org = await Organisations.findByPk(req.params.id);
    if (!org) return res.status(404).json({ error: 'Organisation not found' });

    if (org.logo_url) await deleteFromCloudinary(org.logo_url);

    await org.update({ logo_url: req.file.path });

    res.json({ message: 'Logo uploaded successfully', logoUrl: req.file.path });
  } catch (error) {
    console.error('Error uploading logo:', error);
    res.status(500).json({ error: 'Failed to upload logo' });
  }
};
