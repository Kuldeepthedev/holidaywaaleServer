const db = require("../../../sequelizeConnect");

const Query = db.query

exports.handleUserData = (socket, data) => {
    const params =
    {
      Email: data.Email,
      PhoneNumber: data.PhoneNumber,
      Name:data.Name,
      City:data.City,
      Destination:data.Destination,
      travllers: data.travllers,
      Budget:data.Budget,
      category: data.category,
    }
    
      Query.create(params)
      .then((createdPackage) => {
        if (createdPackage) {
          socket.emit('response', 'Thank you for taking out time to chat with me. One of our Team contact you soon');
        } else {
          console.log("error")
        }
      })
      .catch((err) => {
        console.log(err)
      });
  };
    
    
  
