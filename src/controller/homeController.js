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
module.exports = {
    getHomepage, getdetailuser, addUserpage, contactpage, aboutpage, addusercontrol

}