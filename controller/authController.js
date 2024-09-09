require('dotenv').config({ path: `${process.cwd()}/.env` })
const user = require('../db/models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_TOKEN, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const signUp = catchAsync(async (req, res, next) => {
    const { firstName, lastName, email, password, confirmPassword, userType } =
        req.body

    if (!['1', '2'].includes(userType)) {
        throw new AppError('no', 400)
        // return res.status(400).json({ error: 'no' })
    }

    const newUser = await user.create({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        userType
    })
    if (!newUser) {
        return next(new AppError('fail', 400))
        // return res.status(400).json({ error: 'fail' })
    }

    const result = newUser.toJSON()

    delete result.password
    delete result.deletedAt
    result.token = generateToken({
        id: result.id
    })

    return res.status(201).json({
        message: 'yes',
        data: result
    })
})

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new AppError('missing', 400))
        // return res.status(400).json({ error: 'missing' })
    }

    const result = await user.findOne({ where: { email } })

    if (!result || !(await bcrypt.compare(password, result.password))) {
        return next(new AppError('not', 401))
        // return res.status(401).json({ error: 'not' })
    }

    const token = generateToken({ id: result.id })

    return res.status(401).json({ message: 'yes', token })
})

module.exports = { signUp, login }
