const sharp = require('sharp')

const uploadImage = async (req, res, next) => {

  // if (!req.files || Object.keys(req.files).length === 0) {
  //   return res.status(400).send('No files were uploaded.');
  // }

  if (req.files && Object.keys(req.files).length !== 0) {
    await Promise.all(
      Object.keys(req.files).map(async (key) => {
        return new Promise(async (resolve) => {
          const file = req.files[key]

          const suffixUrl = `/assets/imgs/${Date.now()}-driving-${file.name}`
          const path = `${__dirname}/../client/public${suffixUrl}`
          const path1 = `${__dirname}/../files/${Date.now()}-driving-${file.name}`

          // await file.mv(path, (err) => {
          //   if (err) {
          //     console.log(err)
          //     return res.status(500).send(err);
          //   }
          //   else {
          //     console.log('asdfsdfs')
          // req.body[key] = suffixUrl
          // resolve(true);
          //   }
          // });

          sharp(file.data)
            .resize({width : 701, height: 423, fit: 'fill'})
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(`${path}`
            );     
            
        req.body[key] = suffixUrl
        resolve(true);
        })
      }))
    next()
  }
  else {
    next()
  }
}
// const resizeImages = async (req, res, next) => {
//   if (!req.files) return next();

//   req.body.images = [];
//   await Promise.all(
//     req.files.map(async file => {
//       const filename = file.originalname.replace(/\..+$/, "");
//       const newFilename = `bezkoder-${filename}-${Date.now()}.jpeg`;

//       await sharp(file.buffer)
//         .resize(640, 320)
//         .toFormat("jpeg")
//         .jpeg({ quality: 90 })
//         .toFile(`upload/${newFilename}`);

//       req.body.images.push(newFilename);
//     })
//   );
// next()
// };

module.exports = {
  uploadImage,
};