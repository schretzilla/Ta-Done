import { Project } from '../project/project';

export class ToDo {
    id: number;
    message: string;
    parent: Project;
    child: ToDo;
    complete = false;

    constructor(project: Project, id: number, message: string) {
      this.parent = project;
      this.message = message;
      this.id = id;
    }

  }