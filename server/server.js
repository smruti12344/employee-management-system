const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRouters');

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from uploads

// Routes
app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/employeeManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
