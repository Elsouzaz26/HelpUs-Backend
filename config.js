module.exports = {
    mongoUrl : 'mongodb+srv://adminUser:adminUser123@cluster0.mhtmy.mongodb.net/helpUs?retryWrites=true&w=majority',
    googleKey: 'AIzaSyClAnc__rQnEoH75Zs2sbWKj06tAYlSQus',
    jwt: {
        email: {
            secretKey: 'jsonEmailWebTokenTruckLoadsSecretKey',
            expiresIn: '15m'
        },
        password : {
            secretKey: 'jsonPasswordWebTokenTruckLoadsSecretKey',
            expiresIn: '15m'
        }
        
        
    }
}
//mongodb+srv://adminuser:adminuser123@cluster0.mhtmy.mongodb.net/helpUs?retryWrites=true&w=majority