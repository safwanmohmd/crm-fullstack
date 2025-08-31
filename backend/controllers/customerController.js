import customerModel from "../models/customerModel.js"

export const createCustomer = async (req, res) => {
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        return res.status(400).json({ message: 'email , phone , name are required' })
    }
    const newCustomer = await customerModel.create({ name, email, phone, createdAt: Date.now(), updatedAt: Date.now() })
    res.status(201).json({ message: "new customer created ", newCustomer })
}

export const editCustomer = async (req, res) => {
    const { id } = req.params
    const findCus = await customerModel.findById(id)
    if (!findCus) {
        return res.status(404).json({ message: "no customer found" })
    }
    const updateCus = await customerModel.findByIdAndUpdate(id, { ...req.body, updatedAt: Date.now() }, { new: true })
    res.status(200).json({ message: "updated user", updateCus })
}

export const deleteCustomer = async (req, res) => {
    const { id } = req.params
    const customer = await customerModel.findById(id)
    if (!customer) {
        return res.status(404).json({ message: "no customers found " })
    }

    const deleteCustomer = await customerModel.findByIdAndDelete(id)
    res.status(200).json({ message: "successfully deleted ", deleteCustomer })
}

export const getAllCustomers = async (req, res) => {
    const customers = await customerModel.find({})
    res.status(200).json({ message: "fetched customers", customers })
}
