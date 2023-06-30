import express from "express";
import homeController from "../controller/homeController"
import multer from "multer"
import path from 'path'
let router = express.Router()
var approot = require('app-root-path')

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
        req.fileValidationError = "Dinh dang anh khong phu hop"
        return cb("Dinh dang anh khong hop le", false)
    }
    cb(null, true)
}
let upload = multer({ storage: storage, fileFilter: imageFilter })
let uploadmutil = multer({ storage: storage, fileFilter: imageFilter }).array('mutilple_pic', 2)
const webroute = (app) => {
    router.get('/', homeController.getHomepage)
    router.get('/addUser', homeController.addUserpage)
    router.get('/contact', homeController.contactpage)
    router.get('/about', homeController.aboutpage)
    router.get('/addfile', homeController.addfilepage)
    router.post('/add-new-user', homeController.addusercontrol)
    router.post('/delete-user', homeController.deleteusercontrol)
    router.post('/update-user', homeController.updateusercontrol)
    router.get('/edit-user/:id', homeController.getedituserpage)
    router.get('/detail/user/:id', homeController.getdetailuser)
    router.post('/addsinglefile', upload.single('profile_pic'), homeController.addsinglefile)
    router.post('/addmutilfiles', (req, res, next) => {
        uploadmutil(req, res, (err) => {
            if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
                res.send("Chi duoc truyen toi da 2 file")
            }
            else if (err) {
                res.send(err)
            }
            else {
                next();
            }
        })
    }, homeController.addmutilfiles)
    return app.use('/', router)
}

export default webroute;
