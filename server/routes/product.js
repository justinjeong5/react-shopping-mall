const express = require('express');
const router = express.Router();
const { User } = require('../models/User')
const { Product } = require('../models/Product')
const multer = require('multer');

const { auth } = require('../middleware/auth');


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
    if (error) {
      console.error(error)
      return res.status(400).json({ code: 'MulterError', message: '이미지를 업로드하는 과정에서 문제가 발생했습니다.' })
    }
    res.status(200).json({ success: true, image: { image: res.req.file.path, fileName: res.req.file.filename } });
  })
})

router.post('/uploadProduct', auth, (req, res) => {
  User.findOne({ "_id": req.body.writer },
    (error, user) => {
      if (error) {
        console.error(error)
        return res.status(401).json({ code: 'DatabaseError', message: '사용자를 데이터베이스에서 찾을 수 없습니다.' })
      }
      const product = new Product(req.body)
      product.save((error, product) => {
        if (error) {
          console.error(error)
          return res.status(400).json({ code: 'DatabaseError', message: '상품을 등록하는 과정에서 문제가 발생했습니다.' })
        }
        res.status(200).json({ success: true, product });
      })
    })
})

router.post('/products', (req, res) => {
  const order = req.body.order ? req.body.order : 'desc';
  const sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  const limit = parseInt(req.body.limit);
  const skip = parseInt(req.body.skip);

  const findArgs = {}
  if (req.body.filters?.sort) {
    findArgs['sort'] = req.body.filters.sort
  }
  if (req.body.filters?.price) {
    findArgs['price'] = {
      $gte: req.body.filters.price[0],
      $lte: req.body.filters.price[1],
    }
  }
  if (req.body.filters?.word) {
    findArgs['$text'] = {
      '$search': req.body.filters.word
    }
  }
  Product.find(findArgs)
    .populate('writer')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((error, products) => {
      if (error) {
        console.error(error)
        return res.status(400).json({ code: 'DatabaseError', message: '상품 목록을 가져오는 과정에서 문제가 발생했습니다.' })
      }
      res.status(200).json({ success: true, products });
    })
})

// return axios.get(`/api/product/product_by_id?id=${data}&type=single`)
router.get('/product_by_id', (req, res) => {
  const findArgs = {}
  if (req.query.type === 'array') {
    findArgs['_id'] = { $in: [...req.query.id.split(',')] }
  } else {
    findArgs['_id'] = req.query.id
  }
  Product.find(findArgs)
    .populate('writer')
    .exec((error, productDetails) => {
      if (error) {
        console.error(error)
        return res.status(401).json({ code: 'DatabaseError', message: '사용자를 데이터베이스에서 찾을 수 없습니다.' })
      }
      res.status(200).json({ success: true, productDetails });
    })

})

module.exports = router