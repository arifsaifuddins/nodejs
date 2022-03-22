const { ObjectID } = require('bson');
const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const dbname = 'arief';

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

const client = new MongoClient(uri)

// connect

client.connect((err, res) => {
  if (err) {
    return console.log('invalid connection');
  }

  // console.log('success!')

  const db = client.db(dbname);

  // create data //

  // // one data
  // db.collection('contact').insertOne({ nama: 'arief', email: 'arief@mail.com' }, (err, res) => {
  //   if (err) {
  //     return console.log('error')
  //   }

  //   console.log(res);
  // })

  // // many data
  // db.collection('contact').insertMany(
  //   [
  //     {
  //       nama: 'arief',
  //       email: 'arief@mail.com'
  //     },
  //     {
  //       nama: 'ajiana',
  //       email: 'aji@mail.com'
  //     },
  //     {
  //       nama: 'diah',
  //       email: 'diah@mail.com'
  //     }
  //   ], (err, res) => {
  //     if (err) {
  //       return console.log('error')
  //     }

  //     console.log(res);
  //   })


  // read data

  // // all data
  // db.collection('contact').find().toArray((err, res) => {
  //   if (err) {
  //     return console.log('error')
  //   }

  //   console.log(res);
  // })

  // // one data
  // db.collection('contact').find({ _id: ObjectID("6239199802233be0509e676e") }).toArray((err, res) => {
  //   if (err) {
  //     return console.log('error')
  //   }

  //   console.log(res);
  // })

  // update data

  // // one 
  // const updatePromise = db.collection('contact').updateOne(
  //   {
  //     _id: ObjectID('623919fe36c087dbf2f34134')
  //   },
  //   {
  //     $set: {
  //       nama: 'adira'
  //     },
  //   }
  // )

  // updatePromise.then((res) => console.log(res)).catch((err) => console.log(err))

  // // many 
  // db.collection('contact').updateMany(
  //   {
  //     nama: 'arief'
  //   },
  //   {
  //     $set: {
  //       nama: 'joni'
  //     },
  //   }
  // ).then((res) => console.log(res)).catch((err) => console.log(err))

  // delete data 

  // // one 
  // db.collection('contact').deleteOne({ _id: ObjectID('623919fe36c087dbf2f34134') }).then(res => console.log(res)).catch(err => console.log(err))

  // many
  db.collection('contact').deleteMany({ nama: 'ajiana' }).then(res => console.log(res)).catch(err => console.log(err))

})
