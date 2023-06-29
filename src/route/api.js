import express from "express";
import apiController from "../controller/apiController"

let router = express.Router()
const initapi = (app) => {
    router.get('/getuser', apiController.getuserapi)
    router.post('/adduser', apiController.adduserapi)
    router.put('/updateuser', apiController.updateuserapi)
    router.delete('/deleteuser', apiController.deleteuserapi)
    return app.use('/api', router)
}

export default initapi;
