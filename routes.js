const Joi = require('@hapi/joi');
const {scanPredictHandler, getProducts, getArticles, getSkins, verifyToken, login, register, editUser} = require('./controllers/controller.js');

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return h.response({ message: 'Welcome to Glowfy API' }).code(200);
        }
    },
    
    // Authentication
    {
        method: 'POST',
        path: '/register',
        handler: register,
        options: {
            validate: {
                payload: Joi.object({
                    name: Joi.string().required(),
                    email: Joi.string().email().required(),
                    password: Joi.string().min(6).required()
                })
            }
        }
    },
    //login
    {
        method: 'POST',
        path: '/login',
        handler: login,
        options: {
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().required(),
                    password: Joi.string().min(6).required()
                })
            }
        }
    },
    //Edit User
    {
        method: 'PATCH',
        path: '/register/{userId}',
        handler: editUser,
        options: {
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data',
                multipart: true,
                maxBytes: 10 * 1024 * 1024, // 10MB
            },
            validate: {
                params: Joi.object({
                    userId: Joi.string().required()
                }),
                payload: Joi.object({
                    name: Joi.string().optional(),
                    email: Joi.string().email().optional(),
                    password: Joi.string().optional(),
                    img: Joi.any().optional()
                })
            },
            pre: [{ method: verifyToken }], // jika menggunakan autentikasi
        }
    },
    
    //predict
    {
        path: '/predict',
        method: 'POST',
        handler: scanPredictHandler,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true
            },
        },
    },

    // Skins
    {
        method: 'GET',
        path: '/skins',
        handler: getSkins,
        options: {
            pre: [{ method: verifyToken }],
        },
    },

    // Articles
    {
        method: 'GET',
        path: '/articles',
        handler: getArticles,
        options: {
            pre: [{ method: verifyToken }],
        },
    },

    // Products
    {
        method: 'GET',
        path: '/products',
        handler: getProducts,
        options: {
            pre: [{ method: verifyToken }],
        },
    },
];
