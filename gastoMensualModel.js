const mongoose = require('mongoose');
const Moneda = require('./monedaModel.js');

const dataSchema = new mongoose.Schema({
	nombre: {
		required: true,
		type: String,
	},
	moneda: {
        required: true,
        type: mongoose.ObjectId,
        ref: 'Moneda'
	},
    monto: {
        required: true,
        type: Number
    },
    esBimestral: {
        required: false,
        type: Boolean,
    },
    esEstimado: {
        required: false,
        type: Boolean,
    },
    estimacion: {
        required: false,
        type: Number
    },
    mes: {
		required: true,
		type: Date,
        validate: {
            validator: function(v){
                return v.getDay() == 1;
            },
            message:"El mes debe indicarse con la fecha del primer día del mes (ej.: 1/12/2024)."
        },
    }
});

module.exports = mongoose.model('GastoMensual', dataSchema);