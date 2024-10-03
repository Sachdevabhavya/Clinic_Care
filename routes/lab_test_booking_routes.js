const express = require('express')
const lab_book_control = require("../controllers/lab_test_booking")
const {user_auth_middleware} = require("../middleware/auth")

const lab_test_book_router = express.Router()

lab_test_book_router.post("/patient_login/:token/getAllLabTest/:test_id/book_lab",user_auth_middleware,lab_book_control.book_lab_test)

module.exports = lab_test_book_router