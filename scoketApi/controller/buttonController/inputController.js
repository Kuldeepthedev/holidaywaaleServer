const db = require("../../../sequelizeConnect");

const Query = db.query

exports.defaultMessage = async(data)=>{
   const userDetails = {
      Email:data[0].data,
      phoneNumber:data[1].data
   }
   Query.create(userDetails)
   .then((createdPackage) => {
     if (createdPackage) {
      console.log('success')
     } else {
       console.log("error")
     }
   })
   .catch((err) => {
     console.log(err)
   });
  
  return {

    message: 'Thank you for taking out time to chat with me. One of our Team contact you soon'
  }
}
    

exports.askNumber = ()=>{
    return {
        message: 'Please enter you number',
        inputs:['PhoneNumber'],
        type:'number'
    }
}
exports.askName = ()=>{
    return {
        message: 'Please enter you name',
        inputs:['Name'],
        type:'text'
    }
}
exports.askCity = ()=>{
    return {
        message: 'Please enter you city',
        inputs:['City'],
        type:'text'
    }
}
exports.askDestination = ()=>{
    return {
        message: 'Please enter you Destination',
        inputs:['Destination'],
        type:'text'
    }
}
exports.askNumOfTravellers = ()=>{
    return {
        message: 'Please enter you total number to members',
        inputs:['travllers'],
        type:'number'
    }
}
exports.askBudget = ()=>{
    return {
        message: 'Please enter you Budget',
        inputs:['Budget'],
        type:'number'
    }
}
exports.askHotelCategory = ()=>{
    return {
        message: 'Please select hotel category',
        inputs:'option',
        options:['2 Star','3 Star','4 Star','5 Star'],
        type:'option'
    }
}
exports.askSubmit = (data)=>{
    console.log(data)
    return {
        buttons:['Submit']
    }
}

