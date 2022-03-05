const fs = require('fs');

// create folder
const folData = './data'
if (!fs.existsSync(folData)) {
  fs.mkdirSync(folData)
}

// create file
const fileCon = './data/contacts.json'
if (!fs.existsSync(fileCon)) {
  fs.writeFileSync(fileCon, '[]', 'utf-8')
}

// get semua data json
const loadContact = () => {
  const json = fs.readFileSync(fileCon, 'utf-8')
  const seeContact = JSON.parse(json)
  return seeContact;
}

// get detail data json
const detailContact = (nama) => {
  const contacts = loadContact()
  const contact = contacts.find(contact => contact.nama === nama)

  return contact;
}


module.exports = { loadContact, detailContact }