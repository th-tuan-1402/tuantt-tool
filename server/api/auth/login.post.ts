import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const adminUserName = process.env.NUXT_ADMIN_USERNAME;
  const adminPassword = process.env.NUXT_ADMIN_PASSWORD;
  const secret = process.env.NUXT_JWT_SECRET;

  if (body?.email && body.email === adminUserName) {
    if (body?.password && body.password === adminPassword) {
      const token = jwt.sign({username: adminUserName}, secret, {expiresIn: "1d"});
      return {token};
    }
  }

  throw createError({
    statusCode: 422,
    message: "Invalid credentials",
  });
})