import { Project } from './project';

export class ToDo {
    id: number;
    message: string;
    parent: Project;
  
    constructor(project: Project, id: number, message: string) {
      this.message = message;
      this.id = id;
    }
  }