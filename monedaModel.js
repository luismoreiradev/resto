const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
	nombre: {
		required: true,
		type: String,
	},
	symbol: {
		required: true,
		type: String,
	},
    longSymbol: {
		required: true,
		type: String,
    }
});

module.exports = mongoose.model('Moneda', dataSchema);