import { Context, Next } from "koa";
import logger from "~/utils/logger";
export async function errorHandler(ctx: Context, next: Next) {
    // let status = 200;
    let code = 0, msg = '操作成功';
    try {
        await next();
    } catch (err) {
        logger('errorHandler', err.message, 'error')
        // status = 500;
        ctx.response.status = 500
        code = -1
        msg = err.message
    }

    // ctx.response.status = status;
    if (ctx.body) {
        ctx.body = {
            code,
            data: ctx.body,
            msg
        }
    }

}