const User = require('../models').User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/app')

exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        // find the user
        const user = await User.findOne({
            where: {
                email
            }
        })

        // check if user found
        if (!user) {
            res.status(404).json({ message: 'User not found!' })
        }
        // check if password matches
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Wrong Password' })
        }

        // generate auth token
        const userwithtoken = generateToken(user.get({ raw: true }))    
        userwithtoken.user.avatar = user.avatar
        return res.send(userwithtoken)
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}

exports.register = async (req, res) => {


    try {
        const user = await User.create(req.body)
        const userwithtoken = generateToken(user.get({ raw: true }))
        return res.send(userwithtoken)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const generateToken = (user) => {
    delete user.password

    const token = jwt.sign(user, config.appKey, { expiresIn: 86400 })

    return { ...{ user }, ...{ token } }
}