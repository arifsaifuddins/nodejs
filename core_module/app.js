const fs = require('fs')
const { constants } = require('buffer')

// syncronous

// write file
// const write = fs.writeFileSync('test.txt', 'Hello semuanya!');
// const write = fs.writeFileSync('data/test.txt', 'Hello semuanya!');
// console.log(write);

// read file
// const read = fs.readFileSync('data/test.txt')
// console.log(read.toString())


// asyncronous

// write file
// const write = fs.writeFile('data/text.txt', 'ini asyncronous', (err) => console.log(err))
// console.log(write)

// read file (2 params)
// fs.readFile('data/test.txt', 'utf-8', (err, res) => {
//   if (err) throw err;
//   console.log(res)
// })


// readline

// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question('Masukan Nama : ', (nama) => {
//   console.log(`Terima kasih ${nama}`)
//   rl.close()
// })

// // multi quesion
// rl.question('Masukan Nama : ', (nama) => {
//   rl.question('Masukan Telepon : ', (phone) => {
//     console.log(`Terima kasih ${nama}, dan nomor anda ${phone}`)

//     rl.close()
//   })
// })


//  buat contact

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// membuat folderData kalo belum
const folderData = './data'
if (!fs.existsSync(folderData)) {
  fs.mkdirSync(folderData)
}

// membuat file
const fileJson = './data/contacts.json'
if (!fs.existsSync(fileJson)) {
  fs.writeFileSync(fileJson, '[]', 'utf-8')
}

rl.question('Whats Your Name : ', (name) => {
  rl.question('Input Your Number : ', (phone) => {
    const contact = { name, phone }

    const json = fs.readFileSync('./data/contacts.json', 'utf-8')
    const contacts = JSON.parse(json)

    contacts.unshift(contact)

    fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts))

    console.log('Thanks You!, your data is : ', contacts)
    rl.close()
  })
})