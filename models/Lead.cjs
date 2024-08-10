const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    number: { type: String, required: true },
    product: { type: String, enum: ['A', 'B', 'C'], required: true },
});

module.exports = mongoose.model('Lead', LeadSchema);
