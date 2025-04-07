import jwt from "jsonwebtoken";

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    if (
      email === process.env.SELLER_EMAIL &&
      password === process.env.SELLER_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.SECRET_KEY, {
        expiresIn: "7d",
      });

      return res
        .status(200)
        .cookie("sellerToken", token, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        })
        .json({
          message: `Welcome Back Seller`,
          success: true,
        });
    } else {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const isSellerAuth = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false });
  }
};

export const LogoutSeller = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("sellerToken", "", { maxAge: 0 })
      .json({
        message: "Logout Successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false });
  }
};
