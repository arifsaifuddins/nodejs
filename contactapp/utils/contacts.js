const fs = require('fs');

// create folder
const folData = 'data'
if (!fs.existsSync(folData)) {
  fs.mkdirSync(folData)
}

// create file
const fileCon = 'data/contacts.json'
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

// nambah data json 
const saveJson = (contacts) => {
  fs.writeFileSync(fileCon, JSON.stringify(contacts))
}

// nambah contact
const addContact = (contact) => {
  const contacts = loadContact()
  contacts.unshift(contact)
  saveJson(contacts)
}

// cek duplikasi
const cekDuplikasi = (nama) => {
  const contacts = loadContact()
  const duplikasi = contacts.find(contact => contact.nama.toLowerCase() === nama.toLowerCase())

  return duplikasi
}

// delete
const deleteContact = (nama) => {
  const contacts = loadContact()

  const contact = contacts.filter(contact => contact.nama.toLowerCase() !== nama.toLowerCase())

  saveJson(contact)
}

// update
const updateContact = (newContact) => {
  const contacts = loadContact()

  const contact = contacts.filter(contact => contact.nama !== newContact.old)

  delete newContact.old
  contact.unshift(newContact)

  saveJson(contact)
}

module.exports = {
  loadContact,
  detailContact,
  addContact,
  cekDuplikasi,
  deleteContact,
  updateContact
}