const fs = require('fs');
const validator = require('validator');

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

// get data json
const loadContact = () => {
  const json = fs.readFileSync(fileCon, 'utf-8')
  const seeContact = JSON.parse(json)
  return seeContact;
}

// create data 
const mkData = (nama, mail, phone, age) => {
  const contact = { nama, mail, phone, age }
  // const json = fs.readFileSync(fileCon, 'utf-8')
  // const seeContact = JSON.parse(json)
  seeContact = loadContact()

  // cek duplikasi nama
  const duplicate = seeContact.find(contact => contact.nama === nama)
  if (duplicate) {
    console.log(`${nama} has been registerred!`)
    return false;
  }

  // cek email
  if (mail) {
    if (!validator.isEmail(mail)) {
      console.log(`${mail} not valid!`)
      return false
    }
  }

  // cek phone
  if (!validator.isMobilePhone(phone, 'id-ID')) {
    console.log(`${phone} not valid in Indonesia`)
    return false
  }

  seeContact.unshift(contact)
  fs.writeFileSync(fileCon, JSON.stringify(seeContact))

  console.log('Thanks, you added a data!')
}

// list
const listData = () => {
  contacts = loadContact()
  contacts.forEach((contact, i) => console.log(`${i + 1}. ${contact.nama} - ${contact.phone}`));
}

// detail
const detailData = (nama) => {
  const contacts = loadContact()
  const contact = contacts.find(contact => contact.nama.toLowerCase() === nama.toLowerCase())

  if (!contact) {
    console.log(`${nama} not defined!`)
    return false
  }

  console.log('Nama : ', contact.nama)
  console.log('Phone : ', contact.phone)
  console.log('Age : ', contact.age)
  if (contact.mail) {
    console.log('Mail : ', contact.mail)
  }
}

// delete
const deleteData = (nama) => {
  const contacts = loadContact()
  const contact = contacts.filter(contact => contact.nama.toLowerCase() !== nama.toLowerCase())

  if (contact.length === contacts.length) {
    console.log(`${nama} not defined!`)
    return false
  }

  fs.writeFileSync(fileCon, JSON.stringify(contact))
  console.log(`${nama} has been deleted!`)
}

module.exports = { mkData, listData, detailData, deleteData }