// 搭配tsconfig.json paths   https://www.npmjs.com/package/module-alias
import 'module-alias/register'
import Koa, { Context } from 'koa'; // koa框架
// import Router from 'koa-router'; // koa-router：处理路由
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import logger from '~/utils/logger';
import routeLoader from '~/routes';
import { errorHandler } from './middlewares';
dotenv.config({
    path: '.env.local'
});

const app = new Koa();
const port = process.env.PORT || 3000;
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.DATABASE as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    pass: "123456",
    user: "admin"

}).then((): void => {
    logger('database', 'Database connected successfully.', 'info');
}).catch((): void => {
    logger('database', 'Could not connnect to database.', 'error');
});

app.use(cors());
app.use(bodyParser({
    jsonLimit: '10mb',
    formLimit: "10mb"
}));
app.use(errorHandler);
routeLoader(app);


app.listen(port, (): void => logger('index', `Server started at http://localhost:${port}`, 'info'));