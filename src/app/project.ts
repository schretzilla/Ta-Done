export class Project {
    id: number;
    name: string;
    //todos: ToDo[];  //TODO: project requires todos but its circular 
  
    constructor(id: number){
      this.id = id;
      // var firstToDo = new ToDo(this, 1, "");
      // this.todos.push(firstToDo);
    }
}