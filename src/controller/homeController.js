import pool from '../configs/connectData'

let getHomepage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * from user')
    return res.render('index.ejs', { datauser: rows })
}

let getdetailuser = async (req, res) => {
    let id = req.params.id
    const [user] = await pool.execute(`SELECT * from user where id = ?`, [id])
    return res.send(user)
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
module.exports = {
    getHomepage, getdetailuser, addUserpage, contactpage, aboutpage, addusercontrol, deleteusercontrol, getedituserpage, updateusercontrol
}