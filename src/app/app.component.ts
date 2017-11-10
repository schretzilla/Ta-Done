import { Component, OnInit } from '@angular/core';
import { ToDo } from './to-do';
import { Project } from './project';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() { }

  ngOnInit(){

  }

  title = 'Ta-Done';
  
  //List of projects
  firstProject = new Project(1);
  projects = [ this.firstProject];
  projectId = 2;

  // The current selected project
  currentProject = this.firstProject;

  //The ToDo in current focus
  currentToDo: ToDo;

  //List of ToDos
  firstToDo = new ToDo(this.firstProject, 1, "")
  todos =  [ this.firstToDo ];
  listId = 2;

  onSelect(todo: ToDo): void {
    this.currentToDo = todo;
  }

  // On Enter key add a todo to the todo list
  onEnterKey(event: KeyboardEvent, curItem: ToDo) {
    var index = this.todos.indexOf(curItem);

    var newToDo = new ToDo(this.currentProject, this.listId, "");
    this.todos.splice(index+1, 0, newToDo);  
    
    //increment the list id of the todos
    //TODO: this can just be the lenght of the list
    this.listId += 1;
    
    this.currentProject.toDoList.push(newToDo);
    // Set cursor focus 
    // this.setFocusOnInput(newToDo);
  }

  onDeleteKey(event: KeyboardEvent, curItem: ToDo) {
    // Only delete if the list isn't empty
    if(this.todos.length > 1 && curItem.message == "")
    {
      var curIndex = this.todos.indexOf(curItem);
      this.todos.splice(curIndex, 1);

      // Set focus to the next available text box
      var nextItem;
      if(curIndex == 0){
        // At start of list, move cursor one down
        nextItem = this.todos[curIndex];
      } else {
        // Anywhere else in list, move one up
        nextItem = this.todos[curIndex-1];
      }

      this.setFocusOnInput(nextItem);
      // var nextElement = document.getElementById(String(nextItem.id));
      // console.log(nextItem.id);
      // nextElement.focus();
      
    }
  }

  //Adds a new project to the projects list
  addProject() {
    let newProject = new Project(this.projectId);
    this.projects.push(newProject);

    //increment project id
    this.projectId+=1;
  }

  // Sets the selected project as the current project
  onProjectSelect(selectedProject: Project){
    this.currentProject = selectedProject;
  }

  setFocusOnInput(nextItem: ToDo){
    var nextElement = document.getElementById(String(nextItem.id));
    console.log(nextItem.id);
    nextElement.focus();
  }
}





