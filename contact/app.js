const yargs = require('yargs')
const { mkData, listData, detailData, deleteData } = require('./contacts')

// add
yargs.command({
  command: 'add',
  describe: 'Add a new contact',
  builder: {
    nama: {
      describe: 'Full Name',
      demandOption: true,
      type: 'string'
    },
    mail: {
      describe: 'Email',
      demandOption: false,
      type: 'string'
    },
    phone: {
      describe: 'Phone Number',
      demandOption: true,
      type: 'string'
    },
    age: {
      describe: 'Age',
      demandOption: true,
      type: 'string'
    },
  },
  handler(argv) {
    // contact = {
    //   nama: argv.nama,
    //   mail: argv.mail,
    //   phone: argv.phone,
    //   age: argv.age
    // }

    // console.log(contact)

    mkData(argv.nama, argv.mail, argv.phone, argv.age)
  }
}).demandCommand()

// list
yargs.command({
  command: 'list',
  describe: 'List All of Data',
  handler() {
    listData();
  }
})

// detail
yargs.command({
  command: 'detail',
  describe: 'Get Detail of Contact by Nama',
  builder: {
    nama: {
      describe: 'Full Name',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    detailData(argv.nama)
  }
})

// delete
yargs.command({
  command: 'del',
  describe: 'Delete One Data of Contact by Nama',
  builder: {
    nama: {
      describe: 'Full Nama',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    deleteData(argv.nama)
  }
})

yargs.parse()