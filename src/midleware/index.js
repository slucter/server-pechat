const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'-irhash-'+file.originalname)
    }
  })
  
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 1 },
    fileFilter: (req, file, cb) => {
        if(!file.originalname.match(/\.(JPG|jpg|PNG|png|GIF|gif|JPEG|jpeg)$/)){
            return cb({ code: 'EXTENSION_DENIED'}, false)
        }
        cb(undefined, true)
    }
 })

module.exports = {
    upload: upload,
    validation: (err, req, res, next) => {
        response(res, { msg: err.code }, 200, null)
        next()
     }

}