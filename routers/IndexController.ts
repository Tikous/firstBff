import { GET, route } from 'awilix-koa';
import { Context } from '@interfaces/IKoa';

@route('/')
class IndexController {
  @GET()
  async actionList(ctx: Context): Promise<void> {
    console.log('🚀 IndexController 被调用了！路径:', ctx.path);
    try {
      const data = await ctx.render('index', {
        data: '服务端数据',
      });
      console.log('🍊🍊🍊🍊🍊🍊🍊 渲染成功: ', data);
      ctx.body = data;
    } catch (error) {
      console.error('模板渲染错误:', error);
      // 临时返回简单的HTML响应
      ctx.type = 'html';
      ctx.body = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>FirstBff</title>
          <meta charset="UTF-8">
        </head>
        <body>
          <h1>欢迎访问 FirstBff</h1>
          <p>服务端数据: 服务端数据</p>
          <p><a href="/api/list">测试 API 接口</a></p>
          <p>模板渲染错误: ${error.message}</p>
        </body>
        </html>
      `;
    }
  }
}
export default IndexController;
