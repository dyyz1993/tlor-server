import Router from 'koa-router';
import DemoController from '~/controllers';
const router = new Router({
  prefix: '/demo',
});
// router.get('/swagger.json', GeneralController.swagger);
router.get('/', (ctx): string => ctx.body = 'API Online');
router.post('/', DemoController.add);
router.get('/find', DemoController.get);

export default router;
