import { Context } from 'koa';
import Project from '~/models';

class DemoController {
  public static async get(ctx: Context): Promise<void> {
    const { project_id, id } = ctx.request.query;
    const project = await Project.findOne({ project_id: project_id as string, id: id as string }).select('events');
    ctx.body = project;
  }



  public static async add(ctx: Context): Promise<void> {
    const { project_id, id } = ctx.request.query;
    const { events } = ctx.request.body;
    const project = await Project.create({ project_id: project_id as string, id: id as string, events });
    ctx.body = project;
  }

}

export default DemoController;
