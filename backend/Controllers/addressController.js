import Address from "../Models/addressModel.js";

export const addAddress = async (req, res) => {
  try {
    const { address, userId } = req.body;
    await Address.create({ ...address, userId });
    res.json({ success: true, message: "Address Added Successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const getAddress = async (req, res) => {
  try {
    const { userId } = req.body;
    const address = await Address.find({ userId });
    res.json({ success: true, address });
  } catch (error) {
    console.log(error);
  }
};
