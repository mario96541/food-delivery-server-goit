const productRouter = require('./Product-router');
const userRouter = require('./user-router');
const mainRouter = require('./main-router')

const router = {
    '/products': productRouter,
    '/signup': userRouter,
    default: mainRouter,
}
module.exports = router;