const productRouter = require('./Product-router');
const userRouter = require('./user-router')

const router = {
    '/products': productRouter,
    '/signup': userRouter
}
module.exports = router;