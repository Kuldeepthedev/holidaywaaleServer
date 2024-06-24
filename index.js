const { Server } = require("socket.io");
const express = require("express");
const socketHandler = require('./scoketApi/socketHandle');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv').config()
const db = require("./sequelizeConnect");
db.sequelize.sync(); 
const adminPackage = require('./routes/admin/package')
const user = require('./routes/user/user')
const app = express();
app.use(bodyParser.json());


const cors = require('cors');





app.use(cors({
  origin: '*'
}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.json());

const httpServer = require("http").createServer(app);


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to handle POST requests for generating content
app.post('/generate', async (req, res) => {
  console.log(req.body)
    const { fullName, email, phoneNumber, startingPoint, endingPoint, travellerNumber, budgetPerPerson, travelDate } = req.body;

    const prompt = `Full Name: ${fullName}, Email: ${email}, Phone Number: ${phoneNumber}, Starting Point: ${startingPoint}, Ending Point: ${endingPoint}, Traveller Number: ${travellerNumber}, Budget Per Person: ${budgetPerPerson}, Travel Date: ${travelDate}`;

    try {
        const result = await model.generateContent(`give itinerary with each day ${prompt} `);
        const response = result.response.text();
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.use('/api/v4/admin/package', adminPackage);
app.use('/api/v4/user',user)

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  socket.on("message", data => {
    socketHandler.handleMessage(socket, data);
});

socket.on("buttonClick", data => {
    socketHandler.handleButtonClick(socket, data);
});
socket.on("submitButton", data => {
  socketHandler.handleSubmitBtn(socket, data);
});
socket.on("inputMessage", data => {
    socketHandler.handleInputMessage(socket,data);
});

socket.on("disconnect", () => {
    socketHandler.handleDisconnect();
});
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
