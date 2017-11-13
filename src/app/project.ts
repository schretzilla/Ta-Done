import { ToDo } from './to-do';

export class Project {
    id: number;
    name: string;
    toDoList: ToDo[];  //TODO: project requires todos but its circular 
    doneList: ToDo[];
    constructor(id: number){
      this.id = id;
      this.toDoList = [];
      this.doneList = [];
    }
}