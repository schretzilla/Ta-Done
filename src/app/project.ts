import { ToDo } from './to-do';

export class Project {
    id: number;
    name: string;
    toDoList: ToDo[];  //TODO: project requires todos but its circular 
  
    constructor(id: number){
      this.id = id;
      var firstToDo = new ToDo(this, 1, "");
      this.toDoList = [firstToDo];
    }
}