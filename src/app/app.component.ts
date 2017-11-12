import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { AppService } from './app.service';

import { ToDo } from './to-do';
import { Project } from './project';

import { ProjectComponent } from './project.component';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css'],

  providers: [AppService]
})
export class AppComponent {
  title = 'Ta-Done';
  
  // @ViewChild(ProjectComponent)
  // private projectComponent: ProjectComponent;
  // //List of projects
  // firstProject = new Project(1);
  // projects = [ this.firstProject];
  // projectId = 2;

  //The ToDo in current focus
  currentToDo: ToDo;
  currentProject = new Project(1);
  
  //TODO: DELETE: just used for testign service name
  currentProjectName = "";
  todos = [];
  listId = 2;  

  constructor(private appService: AppService){
    appService.currentProjectChanged$.subscribe(
      projectName => {
        this.currentProjectName = projectName;
      }
    );
  }

  // ngAfterViewInit() {
  //   // The current selected project
  //   this.currentProject = this.projectComponent.firstProject;

  //   //List of ToDos
  //   var firstToDo = new ToDo(this.projectComponent.firstProject, 1, "")
  //   this.todos =  [ firstToDo ];
  // }

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

  setFocusOnInput(nextItem: ToDo){
    var nextElement = document.getElementById(String(nextItem.id));
    console.log(nextItem.id);
    nextElement.focus();
  }
}





