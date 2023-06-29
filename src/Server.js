import express from 'express'
import configviewengine from './configs/viewengine'
import webroute from './route/web'
import initapi from './route/api'
require('dotenv').config();

const app = express()
const port = process.env.PORT

//thiet lap body-parser chuyen du lieu tu client len server
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//config viewengine cho express framework
configviewengine(app)
//config browse route cho web
webroute(app)
//thiet lap api
initapi(app)

app.listen(port, () => {
    console.log('Web da duoc mo o port 3000')
})