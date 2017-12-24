import { Project } from '../project/project';

export class ToDo {
    id: number;
    message: string;
    parentId: number;
    child: ToDo;
    complete = false;
    htmlId: string; //html element Identifier

    constructor(project: Project, id: number, message: string) {
      this.parentId = project.id;
      this.message = message;
      this.id = id;
      this.htmlId = "To-Do-Item-" + String(id);
    }

  }