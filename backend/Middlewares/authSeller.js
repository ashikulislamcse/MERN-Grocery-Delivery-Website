import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;
  if (!sellerToken) {
    return res.status(400).json({
      message: "User not Authenticated",
      success: false,
    });
  }
  try {
    const decode = await jwt.verify(sellerToken, process.env.SECRET_KEY);
    if (decode.email === process.env.SELLER_EMAIL) {
      next();
    } else {
      return res.status(401).json({
        message: "Invalid Token",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export default authSeller;
