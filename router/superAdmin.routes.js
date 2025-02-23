const { Router } = require("express");
const {appointment, dismissal , getUsers} = require("../controller/superAdmin.ctr")


const superAdminRouter = Router();

/**
 * @swagger
* /getUsers:
*   get:
*     summary: Get list of all users
*     description: Only superadmin can retrieve the list of all users.
*     tags:
*       - Super Admin
*     security:
*       - cookieAuth: []
*     responses:
*       200:
*         description: Successfully retrieved user list
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 users:
*                   type: array
*                   items:
*                     $ref: '#/components/schemas/User'
*       400:
*         description: Bad request (Unauthorized access)
*       401:
*         description: Unauthorized (Invalid or missing access token)
*       500:
*         description: Internal server error
* 
* components:
*   securitySchemes:
*     cookieAuth:
*       type: apiKey
*       in: cookie
*       name: accesstoken
*   schemas:
*     User:
*       type: object
*       properties:
*         _id:
*           type: string
*         name:
*           type: string
*         email:
*           type: string
*         role:
*           type: string
*           enum: [user, admin, superadmin]
*/

superAdminRouter.get("/getUsers", getUsers);



/**
 * @swagger
 * /appointment:
 *   post:
 *     summary: Change user role to admin
 *     description: Only superadmin can change a user's role to admin.
 *     tags:
 *       - Super Admin
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the user to be promoted
 *     responses:
 *       200:
 *         description: Successfully changed user role to admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request (e.g., user not found, user already admin, or unauthorized access)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       401:
 *         description: Unauthorized (Invalid or missing access token)
 *       500:
 *         description: Internal server error
 * 
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: accesstoken
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, admin, superadmin]
 */


superAdminRouter.post("/appointment", appointment);




/**
 * @swagger
 * /dismissal:
 *   post:
 *     summary: Change admin role to user
 *     description: Only superadmin can change an admin's role to user.
 *     tags:
 *       - Super Admin
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the admin to be demoted
 *     responses:
 *       200:
 *         description: Successfully changed admin role to user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request (e.g., user not found, user already a user, or unauthorized access)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       401:
 *         description: Unauthorized (Invalid or missing access token)
 *       500:
 *         description: Internal server error
 * 
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: accesstoken
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, admin, superadmin]
 */

superAdminRouter.post("/dismissal", dismissal);



module.exports = superAdminRouter;
