const {
  defaultMessage,
  askNumber,
  askCity,
  askName,
  askDestination,
  askNumOfTravellers,
  askBudget,
  askHotelCategory,
  askSubmit,
} = require("../controller/buttonController/inputController");

exports.handleInput = (data) => {
 
  const userInput = data[0].placeholder;
  switch (userInput) {
    case "Email":
      return askNumber();
    case "PhoneNumber":
      return askName();
    case "Name":
      return askCity();
    case "City":
      return askDestination();
      case "Destination":
      return askNumOfTravellers();
      case "travllers":
      return askBudget();
      case "Budget":
      return askHotelCategory();
      case "Category":
        return askSubmit()
        case "Submit":
        return handledata(data)
    default:
      break;
  }
  return defaultMessage(data);
};
