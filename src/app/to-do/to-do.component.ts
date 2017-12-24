import { Component, OnInit, Input } from '@angular/core';

// Services
import { ProjectService } from '../services/project.service';
import { Subscription }   from 'rxjs/Subscription';

// Necessary Classs
import { ToDo } from './to-do';
import { Project } from '../project/project';

@Component({
    selector: 'to-do',
    templateUrl: 'to-do.component.html',
  })

export class ToDoComponent {
  // The project in focus
  @Input() currentProject: Project;

  subscription: Subscription;

  constructor(private projectService: ProjectService){
    this.subscription = projectService.currentProjectChanged$.subscribe(
      project => {
        this.currentProject = project;
      }
    );
    
  }

  // On Enter key add a todo to the todo list
  onEnterKey(event: KeyboardEvent, curItem: ToDo) {
    var index = this.currentProject.toDoList.indexOf(curItem);
        
    let newToDo = this.addToDo(index);

    // Update current project
    this.projectService.updateProject(this.currentProject);

    // TODO: find way to set focus to element after it is created
    // Set focus on newly aded element
    // var nextElement = document.getElementById(newToDo.htmlId);
    // nextElement.focus();
  }

  //Adds an element to the specified index of the todo list
  //<param index> index to add an element to
  addToDo(index: number){
    //Get the next availalbe ID
    let listId = this.getNextToDoId();
    var newToDo = new ToDo(this.currentProject, listId, "");
    //TODO: Insert into array at index not just at end
    this.currentProject.toDoList.push(newToDo);
    this.projectService.updateProject(this.currentProject);

    return newToDo;
  }

  toDoMessageChange(curToDo: ToDo) {
    this.projectService.updateProject(this.currentProject);    
  }

  // Move an item from the To Do list to the completed list
  completeItem(curItem: ToDo){
    this.removeItem(curItem, this.currentProject.toDoList);
    this.currentProject.doneList.unshift(curItem);
    this.projectService.updateProject(this.currentProject);        
  }

  // Move an item from the completed list back to the ToDo list
  unCompleteItem(curItem: ToDo){
    this.removeItem(curItem, this.currentProject.doneList);    
    this.currentProject.toDoList.unshift(curItem);
    this.projectService.updateProject(this.currentProject);        
  }

  onDeleteKey(event: KeyboardEvent, curItem: ToDo) {
    // Only delete if the list isn't empty
    if(this.currentProject.toDoList.length > 1 && curItem.message == "")
    {
      var curIndex = this.currentProject.toDoList.indexOf(curItem);
      this.currentProject.toDoList.splice(curIndex, 1);

      // Set focus to the next available text box
      var nextItem;
      if(curIndex == 0){
        // At start of list, move cursor one down
        nextItem = this.currentProject.toDoList[curIndex];
      } else {
        // Anywhere else in list, move one up
        nextItem = this.currentProject.toDoList[curIndex-1];
      }

      var nextElement = document.getElementById(nextItem.htmlId);
      nextElement.focus();
    }

    // Update current project
    this.projectService.updateProject(this.currentProject);
  }

  // Remove an item from the specified list
  private removeItem(itemToRemove: ToDo, listToRemoveFrom: ToDo[]){
    let curIndex = listToRemoveFrom.indexOf(itemToRemove);
    listToRemoveFrom.splice(curIndex, 1);
  }

  // Gets the next ID for a new to-do item
  private getNextToDoId(){
    let todoList = this.currentProject.toDoList;
    let maxId = 0;
    for(let i=0; i<todoList.length; i++){
      let curToDo = todoList[i];
      //Increment the max id when a greater ele id is found
      if(curToDo.id >= maxId){
        maxId = curToDo.id + 1;
      }
    }

    return maxId;
  }
}