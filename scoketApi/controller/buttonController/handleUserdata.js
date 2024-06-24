const { executeQuery } = require("../../../database");

exports.handleUserData = (socket, data) => {
  console.log(data);
  const insertData =
    "INSERT INTO inquiry_table (email, phoneNumber,name,city,destination,travllers,budget,category) VALUES (?, ?,?,?,?,?,?,?)";
    const params =
    [
      data.Email,
      data.PhoneNumber,
      data.Name,
      data.City,
      data.Destination,
      data.travllers,
      data.Budget,
      data.category,
    ]
    executeQuery(insertData, params, (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          
        }
      });
      socket.emit('response', 'Thank you for taking out time to chat with me. One of our Team contact you soon');
    
  
}