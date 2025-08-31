import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Number,
        required: true
    },
    updatedAt: {
        type: Number,
        required: true
    }
})

const customerModel = mongoose.model('customers' ,customerSchema)

export default customerModel