const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authroutes');
const event=require('./routes/event')
const attende=require('./routes/attende')
const task=require('./routes/task')

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5000'],
    credentials:true
}));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection failed:', err));


app.use('/api/auth', authRoutes);
app.use('/api/event',event)
app.use('/api/attend',attende)
app.use('/api/task',task)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
