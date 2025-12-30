// const mongoose = require('mongoose');
// require('dotenv').config();

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//     console.log('Connected DB:', mongoose.connection.name);
//   } catch (err) {
//     console.error('MongoDB connection error:', err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;



// updated 



const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {

    // ✅ YE LINE ADD KAR
    mongoose.set("strictQuery", false);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log('Connected DB:', mongoose.connection.name);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
