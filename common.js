const azdev = require('azure-devops-node-api')
 
const orgUrl = "https://dev.azure.com/poojabangera91"; 
const token = "4fb65pxvilwrtgdgnscuz7miqem7ruqgzi7aezk4zxiddvhxv7dq"; 
 
const authHandler = azdev.getPersonalAccessTokenHandler(token); 
const connection = new azdev.WebApi(orgUrl, authHandler);  

exports.connection = connection;