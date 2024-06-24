const { packageMessage } = require("../../helpers/package");
const { db } = require("../../sequelizeConnect");
const { jsonResponse } = require("../../utils/response");
const Package = db.package;

const Addpackage = (req, res) => {
  const {
    packageType,
    packageTitle,
    packageClass,
    packageDuration,
    packageTheme,
    packageDestinations,
    startCountry,
    endCountry,
    startDestination,
    endDestination,
    packageOverView,
    packageMeal,
    otherService,
    exclusions,
    days,
    travlerType, // Corrected typo
    ageGroup,
    price,
    photoGallery,
  } = req.body;

  const data = {
    packageType,
    packageTitle,
    packageClass,
    packageDuration,
    packageTheme,
    packageDestinations,
    startCountry,
    endCountry,
    startDestination,
    endDestination,
    packageOverView,
    packageMeal,
    otherService,
    exclusions,
    days,
    travlerType, // Corrected typo
    ageGroup,
    price,
    photoGallery,
  };

  Package.create(data)
    .then((createdPackage) => {
      if (createdPackage) {
        jsonResponse(res, 200, packageMessage.success.add);
      } else {
        jsonResponse(res, 400, packageMessage.error.add);
      }
    })
    .catch((err) => {
      jsonResponse(res, 500, packageMessage.defaultErrorr.server);
    });
};

const getPackage = async (req, resp) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = 20;

  try {
    const { count, rows: packages } = await Package.findAndCountAll({
      offset: (page - 1) * limit,
      limit: limit,
    });

    if (packages.length > 0) {
      const totalPage = Math.ceil(count / limit);
      jsonResponse(resp, 200, { message: packageMessage.success.get ,totalPage, packages });
    } else {
      jsonResponse(resp, 404, packageMessage.error.get);
    }
  } catch (err) {
    jsonResponse(resp, 500, packageMessage.defaultErrorr.server);
  }
};

const updatePackage = async (req, res) => {
  const { id } = req.params;
  const {
    packageType,
    packageTitle,
    packageClass,
    packageDuration,
    packageTheme,
    packageDestinations,
    startCountry,
    endCountry,
    startDestination,
    endDestination,
    packageOverView,
    packageMeal,
    otherService,
    exclusions,
    days,
    travlerType, // Corrected typo
    ageGroup,
    price,
    photoGallery,
  } = req.body;

  const data = {
    packageType,
    packageTitle,
    packageClass,
    packageDuration,
    packageTheme,
    packageDestinations,
    startCountry,
    endCountry,
    startDestination,
    endDestination,
    packageOverView,
    packageMeal,
    otherService,
    exclusions,
    days,
    travlerType, // Corrected typo
    ageGroup,
    price,
    photoGallery,
  };

  try {
    const updatedPackage = await Package.update(data, {
      where: { ID: id },
    });

    if (updatedPackage[0] > 0) {
      jsonResponse(res, 200, packageMessage.success.update);
    } else {
      jsonResponse(res, 404, packageMessage.error.update);
    }
  } catch (err) {
    jsonResponse(res, 500, packageMessage.defaultErrorr.server);
  }
};

const deletePackage = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCount = await Package.destroy({
      where: { ID: id },
    });

    if (deletedCount > 0) {
      jsonResponse(res, 200, packageMessage.success.delete);
    } else {
      jsonResponse(res, 404, packageMessage.error.delete);
    }
  } catch (err) {
    jsonResponse(res, 500, packageMessage.defaultErrorr.server);
  }
};

const getSinglePackage = async (req, resp) => {
  const { id } = req.params;

  try {
    const package = await Package.findByPk(id);

    if (package) {
      jsonResponse(resp, 200,{message:packageMessage.success.get,package});
    } else {
      jsonResponse(resp, 404, packageMessage.error.get);
    }
  } catch (err) {
    jsonResponse(resp, 500, packageMessage.defaultErrorr.server);
  }
};

module.exports = {
  Addpackage,
  getPackage,
  updatePackage,
  deletePackage,
  getSinglePackage,
};
