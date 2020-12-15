const express = require('express');
const router = express.Router();
const { Product } = require('../models/Product')
const multer = require('multer');

const { auth } = require('../middleware/auth')


var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/')
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname)
    if (!['.jpeg', '.jpg', '.png'].includes(ext)) {
      return callback(res.status(400).json({ code: 'MulterError', message: 'jpg, jpeg, png 파일만 업로드 가능합니다.' }), false)
    }
    callback(null, true)
  },
})
var upload = multer({ storage: storage }).single('file')

//=====================================
//                Product
//=====================================

router.post('/uploadImage', auth, (req, res) => {
  upload(req, res, error => {
    if (error) return res.status(400).json({ code: 'MulterError', message: '이미지를 업로드하는 과정에서 문제가 발생했습니다.' })
    res.status(200).json({ success: true, image: { image: res.req.file.path, fileName: res.req.file.filename } });
  })
})

module.exports = router