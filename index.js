const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const user = require('./models/user');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false })
    .then((res) => console.log('> Connected to Database...'))
    .catch(err => console.log(`> Error while connecting to mongoDB : ${err.message}`))
mongoose.set('strictQuery', false)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

app.use(express.static(path.join(__dirname, 'client/build')));


app.get('/applications', async(req, res) => {
    let apps = await user.find({approved: false})
    res.status(200).json(apps)
})
app.post('/applications/approve', async (req, res) => {
    let name = req.body.name
    let address = req.body.address
    let gender = req.body.gender
    let app = await user.findOne({name: name, gender: gender, address:address})
    app.approved = true
    app.save()
    res.status(200).json({sucess: true, message: "Approved"})
})
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});