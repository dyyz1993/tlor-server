import Koa from 'koa';
import glob from 'glob';
import logger from '~/utils/logger';
const routeLoader = (app: Koa<Koa.DefaultState, Koa.DefaultContext>): void => {
  glob('**/!(index).ts', {
    cwd: __dirname,
  }, function (er, files) {
    if (er) {
      logger('routes', er.message, 'error');
    } else {
      Promise.all(files.map(async (file) => {
        return import('~/routes/' + file).then(({ default: route }) => {
          app.use(route.routes());
          logger('routes', file + ' load completed', 'info');
        });
      })).then(() => {
        logger('routes', 'all route load completed', 'info');
      })

        ;

    }
  });

};


export default routeLoader;
