exports.getAll = (req, res, next) => {
  res.json([
    {
      nama: 'jeruk',
      harga: '12990'
    },
    {
      nama: 'mangga',
      harga: '30000'
    }
  ])
}

exports.postData = (req, res, next) => {
  console.log(req.body)

  const nama = req.body.nama
  const harga = req.body.harga
  res.json({
    nama, harga
  })

  // res.json({
  //   nama: 'jeruk',
  //   harga: '10000'
  // })
}