const {Sequelize,sequelize} = require('../../sequelizeConnect')

module.exports = (Sequelize,sequelize)=>{
     const package = sequelize.define('package',{
        packageType:{
            type:Sequelize.STRING
        },
        packageTitle:{
            type:Sequelize.STRING
 
        },
        packageClass:{
            type:Sequelize.STRING

        },
        packageDuration:{
            type:Sequelize.STRING

        },
        packageTheme:{
            type:Sequelize.JSON
        },
        packageDestinations:{
            type:Sequelize.JSON

        },
        startCountry :{
            type:Sequelize.STRING
 
        },
        endCountry:{
            type:Sequelize.STRING

        },
        startDestination:{
            type:Sequelize.STRING

        },
        endDestination:{
            type:Sequelize.STRING

        },
        packageOverView:{
            type:Sequelize.STRING

        },
        packageMeal:{
            type:Sequelize.STRING


        },
        otherService:{
            type:Sequelize.JSON

        },
        exclusions:{
            type:Sequelize.STRING

        },
        days:{
            type:Sequelize.JSON

        },
        travlerType:{
            type:Sequelize.STRING

        },
        ageGroup:{
            type:Sequelize.STRING

        },
        price:{
            type:Sequelize.STRING

        },
        photoGallery:{
            type:Sequelize.JSON
        }
         
     })
     return package
}