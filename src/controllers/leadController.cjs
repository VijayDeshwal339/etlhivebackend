const Lead = require('../models/Lead.cjs');

// Create Lead
exports.createLead = async (req, res) => {
    const { email, name, number, product } = req.body;
    try {
        const newLead = new Lead({ email, name, number, product });
        await newLead.save();
        res.status(201).json(newLead);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update Lead
exports.updateLead = async (req, res) => {
    const { email, name, number, product } = req.body;
    try {
        const updatedLead = await Lead.findByIdAndUpdate(req.params.id, { email, name, number, product }, { new: true });
        if (!updatedLead) return res.status(404).json({ error: 'Lead not found' });
        res.json(updatedLead);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete Lead
exports.deleteLead = async (req, res) => {
    try {
        const deletedLead = await Lead.findByIdAndDelete(req.params.id);
        if (!deletedLead) return res.status(404).json({ error: 'Lead not found' });
        res.json({ message: 'Lead deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get Leads
exports.getLeads = async (req, res) => {
    const { search, sort } = req.query;
    try {
        let query = {};
        if (search) {
            query = { $or: [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }] };
        }
        let leads = await Lead.find(query);
        if (sort) {
            leads = leads.sort((a, b) => {
                if (a[sort] < b[sort]) return -1;
                if (a[sort] > b[sort]) return 1;
                return 0;
            });
        }
        res.json(leads);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
