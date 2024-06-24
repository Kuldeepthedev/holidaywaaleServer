

const { handleUserData } = require('./controller/buttonController/handleUserdata');
const { handleButtonMessage } = require('./router/handleButtonMessage'); 
const { handleInput } = require('./router/handleInput');

function handleMessage(socket, data) {
    console.log('Received message:', data);
    const userInput = data ? data.toLowerCase().trim() : '';
     console.log(userInput)
    socket.emit('response', {
        message: 'Hi! I am Your virtual assistant, Do you have a destination in mind or Need help',
        buttons: ['Need Help', 'Inquiry Package']
    });
}

const handleButtonClick  = async(socket, data)=> {
    console.log('Received button click:', data);
    const userInput = data ? data.toLowerCase().trim() : '';
    const result = await handleButtonMessage(userInput)
    socket.emit('response', result);
}
const handleSubmitBtn = async (socket, data) => {
    

    if (typeof data === 'object') {
        const count = Object.keys(data).length;

        if (count > 6) {
           await handleUserData(socket,data)
        }
    }
}


const handleInputMessage = async(socket,data) => {
    // const userInput = data ? data.toLowerCase().trim() : '';
    
    const result = await handleInput(data)
    socket.emit('response', result);
}

function handleDisconnect() {
    console.log("User disconnected");
}

module.exports = {
    handleMessage,
    handleButtonClick,
    handleInputMessage,
    handleDisconnect,
    handleSubmitBtn
};
