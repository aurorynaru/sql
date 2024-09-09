require('dotenv').config({ path: `${process.cwd()}/.env` })
const express = require('express')
const authRoutes = require('./routes/authRoute')
const catchAsync = require('./utils/catchAsync')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controller/errorController')

const app = express()
app.use(express.json())

app.use('/api/auth', authRoutes)

app.use(
    '*',
    catchAsync(async (req, res, next) => {
        throw new AppError(`Can't find ${req.originalUrl} `, 404)
    })
)

app.use(globalErrorHandler)

const PORT = process.env.APP_PORT || 8009

app.listen(PORT, () => {
    console.log('running', PORT)
})
