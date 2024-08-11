const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db.cjs');
const authRoutes = require('./src/routes/authRoutes.cjs');
const leadRoutes = require('./src/routes/leadRoutes.cjs');

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
