// const fs = require('fs');
// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

// // create folder
// const folData = './data'
// if (!fs.existsSync(folData)) {
//   fs.mkdirSync(folData)
// }

// // create file
// const fileCon = './data/contacts.json'
// if (!fs.existsSync(fileCon)) {
//   fs.writeFileSync(fileCon, '[]', 'utf-8')
// }

// // // promise
// // const question1 = () => {
// //   return new Promise((resolve, rejects) => {
// //     rl.question('Masukan Nama : ', (nama) => {
// //       resolve(nama)
// //     })
// //   })
// // }

// // const question2 = () => {
// //   return new Promise((resolve, rejects) => {
// //     rl.question('Masukan Email : ', (mail) => {
// //       resolve(mail)
// //     })
// //   })
// // }

// // complexity promise
// const questions = (question) => {
//   return new Promise((resolve, rejects) => {
//     rl.question(question, (response) => {
//       resolve(response)
//     })
//   })
// }

// const mkData = async () => {
//   // const nama = await question1()
//   // const mail = await question2()

//   const nama = await questions('Whats Your Name : ')

//   const contact = { nama, mail }
//   const json = fs.readFileSync(fileCon, 'utf-8')
//   const seeContact = JSON.parse(json)

//   seeContact.unshift(contact)
//   fs.writeFileSync(fileCon, JSON.stringify(seeContact))

//   rl.close()
// }

// mkData()