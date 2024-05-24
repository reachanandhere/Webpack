const express =  require('express');
const app = express()
const path = require('path')
const fs = require('fs')

app.use('/static', express.static(path.resolve(__dirname, '../dist')))

app.get('/',(req, res)=>{
    const htmlPath = path.resolve(__dirname, '../dist/index.html')
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8')
    res.send(htmlContent)
})

app.listen(3000, ()=>{
    console.log("Server is listening!")
})