// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.header('Authorization');

//   // Check if header exists and starts with Bearer
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'No token, access denied' });
//   }

//   //  Extract the token from "Bearer <token>"
//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Now req.user.id will work
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// module.exports = authMiddleware;





//   new   middleware





// // backend/middleware/authMiddleware.js
// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = { id: decoded.id }; // 👈 IMPORTANT
//     next();
//   } catch (err) {
//     console.error("❌ Auth middleware error:", err);
//     res.status(401).json({ message: "Invalid token" });
//   }
// };






// updated middleware


const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id }; // ✅ PERFECT
    next();
  } catch (err) {
    console.error("❌ Auth middleware error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};
