const Organisations = require('../models/organisation');

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
    } catch(error) {
        console.error('Error fetching organisation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createOrganisation = async (req,res)=>{
    try {
        const newOrg = await Organisations.create(req.body);
        res.status(201).json(newOrg);
    } catch (error) {
        console.error('Error creating organisation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateOrganisation = async (req,res) =>{
    try {
        const org = await Organisations.findByPk(req.params.id);
        if (!org) {
            return res.status(404).json({ error: 'Organisation not found' });
        }
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
        if (!org) {
            return res.status(404).json({ error: 'Organisation not found' });
        }
        await org.destroy();
        res.status(200).json({ message: 'Organisation deleted successfully' });
    } catch (error) {
        console.error('Error deleting organisation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};