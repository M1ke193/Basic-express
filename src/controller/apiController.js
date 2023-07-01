import pool from '../configs/connectData'
var approot = require('app-root-path')

let getuserapi = async (req, res) => {

    const [rows, fields] = await pool.execute('SELECT * from user')
    return res.status(200).json({
        message: "OK",
        data: rows
    })
}
let adduserapi = async (req, res) => {
    let { name, email } = req.body
    if (!name || !email)
        return res.status(200).json({
            message: "Missing data",
        })
    await pool.execute('insert into user(Name,Email) values (?,?)', [name, email])
    return res.status(200).json({
        message: "Add user successful",
    })
}

let updateuserapi = async (req, res) => {
    let { name, email, id } = req.body
    if (!name || !email || !id)
        return res.status(200).json({
            message: "Missing data",
        })
    await pool.execute('UPDATE user SET Name = ?, Email = ? WHERE id = ?', [name, email, id])
    return res.status(200).json({
        message: "Update user successful",
    })
}
let deleteuserapi = async (req, res) => {
    let { id } = req.body
    if (!id)
        return res.status(200).json({
            message: "Missing data",
        })
    await pool.execute('DELETE FROM user WHERE id = ?', [id])
    return res.status(200).json({
        message: "Delete user successful",
    })
}


let singlefileapi = (req, res) => {
    return res.status(200).json({
        message: "File uploaded successful",
    })
}

let mutilfileapi = (req, res) => {
    return res.status(200).json({
        message: "Files uploaded successful",
    })
}

module.exports = {
    getuserapi, adduserapi, updateuserapi, deleteuserapi, singlefileapi, mutilfileapi
}