exports.needHelpButton = ()=>{
         return {
            message: 'Please share the following details, and one of our customer support agents will be glad to assist you!.',
            inputs: ['email','phone number']
          }
}

exports.inquiryPackageButton = ()=>{
  return {
    message: 'Please share the following details, and one of our customer support agents will be glad to assist you for package details!.',
    inputs: ['Email']
  }
}
exports.handleUserData = (userInput)=>{
  console.log(userInput)
  return {
    message: 'Data uploaded success',
    
  }
}