require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB = require('./db/connect')
const errorHandlerMiddleware = require('./middleware/error-handler')
const routeAuth = require('./middleware/route-auth')
const reqAuthRoutes = require('./routes/req-auth-routes')
const auth = require('./routes/auth')
const noAuthRoutes = require('./routes/no-auth-routes')

// extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

// trust proxy is important if you are going to host the api on the internet (heroko)
app.set('trust proxy', 1);
app.use(express.json());
app.use(helmet())
app.use(xss())
app.use(cors())
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, //limit each ip to 100 requests per windowMs
}))

//routes
app.use('/api/v1', noAuthRoutes)
app.use('/api/v1/auth', auth)
// need to put route auth middle ware
app.use('/api/v1/user', routeAuth, reqAuthRoutes)

//error handlers
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI).then(console.log('connction successful'))
    app.listen(port, () =>{
      console.log(`Server is listening on port ${port}...`)
      console.log('latest commit')
    }
    );
  } catch (error) {
    console.log(error);
  }
};

start();
