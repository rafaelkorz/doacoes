const jwt = require("jsonwebtoken");

let refreshTokens = [];

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: "10s" });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET);
};

const registerToken = (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  
  refreshTokens.push(refreshToken);

  return {
    ...user.toObject(),
    accessToken,
    refreshToken,
  };
}

const getRefreshToken = () => {
  return refreshTokens;
}

const setRefreshToken = (token) => {
  refreshTokens = token
}

const setRefreshTokenPush = (token) => {
  refreshTokens.push(token)
}

module.exports = { generateAccessToken, 
                    generateRefreshToken, 
                    registerToken, 
                    getRefreshToken, 
                    setRefreshToken, 
                    setRefreshTokenPush 
                  }