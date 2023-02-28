import multer, { diskStorage } from 'multer'
import path from 'path'
import express from 'express'
import {
  accountActivation,
  accountActivationByCode,
  loggedInUser,
  updateUser,
  login,
  register,
  forgetPassword,
  resetPasswordAction,
  resendActivationLink,
  findUserAccount,
  passwordResetOtporLink,
  passwordResetOtpCheck,
  changePassword,
  resendResetPasswordOTP,
  profilePhotoUpdate,
} from '../controllers/userController.js'

// resolve
const __dirname = path.resolve()

// multer manage
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + '' + file.originalname)
  },
  destination: (req, file, cb) => {
    if (file.fieldname === 'profile') {
      cb(null, path.join(__dirname, '/api/public/profile'))
    }
  },
})
const profilePhotoMul = multer({ storage: storage }).single('profile')

// router
const router = express.Router()

// user auth route manage
router.post('/login', login)
router.post('/register', register)
router.get('/me', loggedInUser)
router.put('/update-user/:id', updateUser)
router.put('/profile-photo-update/:id', profilePhotoMul, profilePhotoUpdate)
router.get('/account-activate/:token', accountActivation)
router.post('/code-activation', accountActivationByCode)
router.post('/resend-activation', resendActivationLink)
router.post('/forget-password', forgetPassword)
router.post('/find-user-account', findUserAccount)
router.post('/reset-password/:token', resetPasswordAction)
router.post('/password-reset-otp', passwordResetOtporLink)
router.post('/password-reset-otp-check', passwordResetOtpCheck)
router.post('/change-password', changePassword)
router.post('/resend-reset-otp', resendResetPasswordOTP)

// export router
export default router
