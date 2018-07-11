const path = require('path')
const express = require('express');

const publicPath = path.join(__dirname, '..', 'public');

const app = express();

app.use(express.static(publicPath));
// app.get('/', ( req, res) => {
//     res.render('',publicPath+'/index.html')
// })


app.listen(3000, () => {
    console.log('server is runnig on post 3000');
})

