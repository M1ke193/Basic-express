import express from "express";
import homeController from "../controller/homeController"
let router = express.Router()

const webroute = (app) => {
    router.get('/', homeController.getHomepage)
    router.get('/addUser', homeController.addUserpage)
    router.get('/contact', homeController.contactpage)
    router.get('/about', homeController.aboutpage)
    router.post('/add-new-user', homeController.addusercontrol)
    router.post('/delete-user', homeController.deleteusercontrol)
    router.post('/update-user', homeController.updateusercontrol)
    router.get('/edit-user/:id', homeController.getedituserpage)
    router.get('/detail/user/:id', homeController.getdetailuser)
    router.get('/test', (req, res) => {
        res.send("route to test")
    })
    return app.use('/', router)
}

export default webroute;
