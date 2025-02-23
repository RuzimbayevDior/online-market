/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: johndoe
 *         password:
 *           type: string
 *           format: password
 *           example: mysecurepassword
 *         email:
 *           type: string
 *           format: email
 *           example: johndoe@xample.com
 *         role:
 *           type: string
 *           enum: [user, premium_user, admin, superadmin]
 *           default: user
 *         gender:
 *           type: string
 *           enum: [male, female]
 *         premium:
 *           type: string
 *           enum: [free, 1_oylik, 3_oylik, 6_oylik, 12_oylik]
 *           default: free
 *         verify:
 *           type: boolean
 *           default: false
 *         verify_code:
 *           type: string
 *           nullable: true
 */


const { Router } = require("express");
const {
  register,
  verify,
  login,
  logout,
  profil,
  re_verifyCode
} = require("../controller/Auth.ctr");


const AuthRouter = Router();

/** 
*  @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user and sends a verification code via email.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - username
 *               - gender
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@gmail.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "P@ssw0rd!"
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *                 example: "male"
 *     responses:
 *       "200":
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Registered
 *       "400":
 *         description: Bad request, user already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bu foydalanuvchi avval ro`yxatdan o`tgan
 *       "500":
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */

AuthRouter.post("/register", register);

/** @swagger 
* /verify:
*   post:
*     summary: Verify a user's email
*     description: Verifies a user's email using a verification code.
*     tags:
*       - Auth
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - email
*               - verify_code
*             properties:
*               email:
*                 type: string
*                 format: email
*                 example: "user@gmail.com"
*               verify_code:
*                 type: string
*                 example: "123456"
*     responses:
*       "200":
*         description: User successfully verified
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Verified
*       "400":
*         description: Invalid verification code or user not found
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Your verify code is invalid
*       "500":
*         description: Internal server error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Internal Server Error
*/


AuthRouter.post("/verify", verify);

/** @swagger 
* /login:
*   post:
*     summary: User login
*     description: Logs in a user and returns an access token.
*     tags:
*       - Auth
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - email
*               - password
*             properties:
*               email:
*                 type: string
*                 format: email
*                 example: "user@gmail.com"
*               password:
*                 type: string
*                 format: password
*                 example: "P@ssw0rd!"
*     responses:
*       "200":
*         description: User successfully logged in
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Successfully
*                 token:
*                   type: object
*                   properties:
*                     accesstoken:
*                       type: string
*                       example: "jwt_token_here"
*       "400":
*         description: Invalid credentials or user not verified
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Invalid password or user not verified
*       "500":
*         description: Internal server error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Internal Server Error
*/


AuthRouter.post("/login", login);
// authRouter.post("/refresh");

/** @swagger
* /logout:
*   post:
*     summary: User logout
*     description: Logs out a user by clearing authentication cookies.
*     tags:
*       - Auth
*     responses:
*       "200":
*         description: Successfully logged out
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Successfully logged out
*       "500":
*         description: Internal server error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: There is an Error
*/



AuthRouter.post("/logout", logout);



/**
 * @swagger
 * /profil:
 *   get:
 *     summary: Foydalanuvchi profilini olish
 *     description: Berilgan foydalanuvchi ID bo'yicha profilni qaytaradi.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Foydalanuvchi ID si
 *     responses:
 *       200:
 *         description: Foydalanuvchi ma'lumotlari qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: Foydalanuvchi ma'lumotlari
 *       400:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */



AuthRouter.get("/profil", profil);





/** @swagger 
* /re_verify:
*   post:
*     summary: Verify a user's email
*     description: Verifies a user's email using a verification code.
*     tags:
*       - Auth
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - email
*             properties:
*               email:
*                 type: string
*                 format: email
*                 example: "user@gmail.com"
*     responses:
*       "200":
*         description: verify code has been sent successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Successfully
*       "500":
*         description: Internal server error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Internal Server Error
*/


AuthRouter.post("/re_verify", re_verifyCode);

module.exports = AuthRouter;
