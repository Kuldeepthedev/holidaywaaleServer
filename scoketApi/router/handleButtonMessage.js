const { needHelpButton, inquiryPackageButton, handleUserData } = require("../controller/buttonController/buttonController.js");

exports.handleButtonMessage = (userInput) => {
    console.log(userInput)
    switch (userInput) {
        case 'need help':
            return needHelpButton();
        case 'inquiry package':
            return inquiryPackageButton();
        case (typeof userInput === 'object'):
            return handleUserData(userInput)
        default:
            
            break;
    }
};
