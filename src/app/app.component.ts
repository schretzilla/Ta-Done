import { Component } from '@angular/core';
import { ToDo } from './to-do';
import { Project } from './project';
@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  template: `<div style="text-align:center">
  <h1>
    {{title}}!
  </h1>
</div>

<div>
    <h2>Projects</h2>
    <ul>
      <li *ngFor="let project of projects" (click)="onProjectSelect(project)">
          <project-detail [project]="project"></project-detail>          
      </li>
    </ul>
</div>

<h2>List ToDo </h2>
<ul>
  <li *ngFor="let todo of todos" (click)="onSelect(todo)">
    <!-- <span>{{todo.id}}</span> {{todo.message}} -->
    <input id={{todo.id}}
            (keyup.enter)="onEnterKey($event, todo)" 
            (keyup.backspace)="onDeleteKey($event, todo)"
            [(ngModel)]="todo.message">
  </li>
</ul>

<div *ngIf="currentToDo">
  <h2>{{currentToDo.message}}</h2>
</div>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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

  
  onEnterKey(event: KeyboardEvent, curItem: ToDo) {
    var index = this.todos.indexOf(curItem);

    var newToDo = new ToDo(this.currentProject, this.listId, "");
    this.todos.splice(index+1, 0, newToDo);   
    this.listId += 1;

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




