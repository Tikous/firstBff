import { addAliases } from 'module-alias';
addAliases({
  '@root': __dirname,
  '@interfaces': `${__dirname}/interface`,
  '@config': `${__dirname}/config`,
  '@middlewares': `${__dirname}/middlewares`,
});
import Koa from 'koa';
import { createContainer, Lifetime } from 'awilix';
import co from 'co';
import render from 'koa-swig';
import config from '@config/index';
import serve from 'koa-static';
import { loadControllers, scopePerRequest } from 'awilix-koa';
// 把除了api的真实路由，都给转回首页
import { historyApiFallback } from 'koa2-connect-history-api-fallback'
const app = new Koa();
// memoryFlag 内存缓存
const { port, viewDir, memoryFlag, staticDir } = config;

app.use(serve(staticDir));
const container = createContainer();

// 把service放在容器里，这样service就可以往routers controller里边进行注入
container.loadModules([`${__dirname}/services/*.ts`], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  },
});

app.use(scopePerRequest(container));
app.context.render = co.wrap(
  render({
    root: viewDir,
    autoescape: true,
    cache: <'memory' | false>memoryFlag,
    writeBody: false,
    ext: 'html',
  })
);

app.use(scopePerRequest(container));
app.use(loadControllers(`${__dirname}/routers/*.ts`));
// 把除了api的真实路由，都给转回首页
app.use(historyApiFallback({ index: '/', whiteList: ['/api'] }));
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
})