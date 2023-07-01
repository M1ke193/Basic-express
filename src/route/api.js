import express from "express";
import apiController from "../controller/apiController"
import multer from 'multer'
import path from 'path'
var approot = require('app-root-path')

let router = express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, approot + "/src/public/image/")
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        return cb("Dinh dang anh khong hop le", false)
    }
    cb(null, true)
}

let upload = multer({ storage: storage, fileFilter: imageFilter }).single('profile_pic')
let uploadmulti = multer({ storage: storage, fileFilter: imageFilter }).array('mutil_pic', 2)
const initapi = (app) => {
    router.get('/getuser', apiController.getuserapi)
    router.post('/adduser', apiController.adduserapi)
    router.put('/updateuser', apiController.updateuserapi)
    router.delete('/deleteuser', apiController.deleteuserapi)
    router.post('/singlefile', (req, res, next) => {
        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                res.status(404).json({
                    message: "Truyen toi da 1 file pls",
                })
            }
            else if (err) {
                res.status(404).json({
                    message: err,
                })
            }
            else {
                next();
            }
        })
    }, apiController.singlefileapi)
    router.post('/mutilfile', (req, res, next) => {
        uploadmulti(req, res, (err) => {
            if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
                res.status(404).json({
                    message: "Truyen toi da 2 file pls",
                })
            }
            else if (err) {
                res.status(404).json({
                    message: err,
                })
            }
            else {
                next();
            }
        })
    }, apiController.mutilfileapi)
    return app.use('/api', router)
}

export default initapi;
