const validator = require('validator')

const email = validator.isEmail('asaifuddien@mail.com');
const phone = validator.isMobilePhone('010948393', 'id-ID')

console.log(phone, email)
console.log('NPM')