const dataBaseName = 'TheBook';
const username= 'vikas_m';
const password = '4oXFbY3DahwvrHZy';

module.exports = {
  mongoURL:"mongodb+srv://"+username+":"+password+"@cluster0-6cyxk.mongodb.net/"+dataBaseName+"?retryWrites=true",
  secret:"someUniqueCode"
};
