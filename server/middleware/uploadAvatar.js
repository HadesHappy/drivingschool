const uploadAvatar = async (req, res, next) => {
  if (req.files && Object.keys(req.files).length !== 0) {
    await Promise.all(
      Object.keys(req.files).map(async (key) => {
        return new Promise(async (resolve) => {
          const file = req.files[key]

          const suffixUrl = `/assets/avatars/${Date.now()}-avatar-${file.name}.png`
          const path = `${__dirname}/../client/public${suffixUrl}`

          await file.mv(path, (err) => {
            if (err) {
              return res.status(500).send(err);
            }
            else {
              req.body[key] = suffixUrl
              resolve(true);
            }
          });
        })
      }))
    next()
  }
  else {
    next()
  }
}
module.exports = {
  uploadAvatar,
};