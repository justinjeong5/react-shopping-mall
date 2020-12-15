const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: true,
  credentials: true,  // cookie 전달하는 설정
}));

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => {
  console.log('...database connected successfully!')
}).catch((error) => {
  console.error(error)
})

app.use('/api/user', require('./routes/user'));
app.use('/api/product', require('./routes/product'));
app.use('/uploads', express.static('uploads'));


app.get('/', (req, res) => {
  res.status(200).send('connected server-side app')
})


const port = 5000;

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})