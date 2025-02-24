import jwt from 'jsonwebtoken';

export default defineEventHandler((event) => {
  const url = event.node.req.url

  if (url !== '/api/auth/login') {
    const {authorization} =  event.node.req.headers
    const secret = process.env.NUXT_JWT_SECRET
    let isAuthenticated = false

    if (authorization) {
      let token = authorization.replace('Bearer ', '')
      jwt.verify(token, secret, (err, decoded) => {
        if (!err) {
          isAuthenticated = true
        }
      })
    }
  
    if (!isAuthenticated) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized',
      });
    }
  }
})