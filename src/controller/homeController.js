import pool from '../configs/connectData'
import multer from "multer"
let getHomepage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * from user')
    return res.render('index.ejs', { datauser: rows })
}

let getdetailuser = async (req, res) => {
    let id = req.params.id
    const [user] = await pool.execute(`SELECT * from user where id = ?`, [id])
    return res.render('action/detailuser.ejs', { datauser: user[0] })
}

let addUserpage = (req, res) => {
    return res.render('nav/adduser.ejs')
}

let contactpage = (req, res) => {
    return res.render('nav/contact.ejs')
}

let aboutpage = (req, res) => {
    return res.render('nav/about.ejs')
}

let addusercontrol = async (req, res) => {
    let { name, email } = req.body
    await pool.execute('insert into user(Name,Email) values (?,?)', [name, email])
    return res.redirect("/")
}

let deleteusercontrol = async (req, res) => {
    await pool.execute('DELETE FROM user WHERE id = ?', [req.body.id])
    return res.redirect("/")
}

let getedituserpage = async (req, res) => {
    let id = req.params.id
    const [user] = await pool.execute(`SELECT * from user where id = ?`, [id])
    return res.render('action/edituser.ejs', { datauser: user[0] })
}

let updateusercontrol = async (req, res) => {
    const { name, email, id } = req.body
    await pool.execute('UPDATE user SET Name = ?, Email = ? WHERE id = ?', [name, email, id])
    return res.redirect("/")
}
let addfilepage = (req, res) => {
    return res.render('nav/addfile.ejs')
}
let addsinglefile = (req, res) => {

    if (req.fileValidationError) {
        return res.send(req.fileValidationError)
    }
    else if (!req.file) {
        return res.send('Lam on bo cai file vo gium cai, upload file ma k bo file ?????')
    }
    return res.send(`Image has been uploaded: <br> <img src="/image/${req.file.filename}" width="700"
        height="400">`)
}
let addmutilfiles = (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError)
    }
    else if (!req.files.length) {
        return res.send('Lam on bo cai file vo gium cai, upload file ma k bo file ?????')
    }
    let kq = "Images have been uploaded: <br>"
    for (let index = 0; index < req.files.length; index++) {
        kq += `<img src="/image/${req.files[index].filename}" width="700" height="400" style="margin-right: 10px">`
    }
    return res.send(kq)
}
module.exports = {
    getHomepage, getdetailuser, addUserpage, contactpage, aboutpage, addusercontrol, deleteusercontrol, getedituserpage, updateusercontrol, addfilepage,
    addsinglefile, addmutilfiles
}