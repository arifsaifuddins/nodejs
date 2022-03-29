exports.register = (req, res) => {
  const nama = req.body.nama;
  const email = req.body.email;

  const result = {
    nama, email
  }

  res.status(200).json(result)
}