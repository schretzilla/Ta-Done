import { Component } from '@angular/core';

// Services
import { AppService } from './app.service';
import { Subscription }   from 'rxjs/Subscription';

// Necessary Classs
import { ToDo } from './to-do';
import { Project } from './project';

@Component({
    selector: 'to-do',
    templateUrl: 'to-do.component.html',
  })

export class ToDoComponent {
    listId = 2;

    currentProject = new Project(1);

    subscription: Subscription;

    constructor(private appService: AppService){
      this.subscription = appService.currentProjectChanged$.subscribe(
        project => {
          this.currentProject = project;
          console.log("Project changed in todo");
        }
      );
    }

    // On Enter key add a todo to the todo list
  onEnterKey(event: KeyboardEvent, curItem: ToDo) {
    var index = this.currentProject.toDoList.indexOf(curItem);

    this.addToDo(index);

    // var newToDo = new ToDo(this.currentProject, this.listId, "");
    // this.currentProject.toDoList.splice(index+1, 0, newToDo);  
    
    //increment the list id of the todos
    //TODO: this can just be the lenght of the list
    this.listId += 1;
    
    //this.currentProject.toDoList.push(newToDo);
    // Set cursor focus 
    // this.setFocusOnInput(newToDo);
  }

  addToDo(index: number){
    var newToDo = new ToDo(this.currentProject, this.listId, "");
    this.currentProject.toDoList.splice(index+1, 0, newToDo);  
    
  }

  // Move an item from the To Do list to the completed list
  completeItem(curItem: ToDo){
    this.removeItem(curItem, this.currentProject.toDoList);
    this.currentProject.doneList.unshift(curItem);
  }

  // Move an item from the completed list back to the ToDo list
  unCompleteItem(curItem: ToDo){
    this.removeItem(curItem, this.currentProject.doneList);    
    this.currentProject.toDoList.unshift(curItem);
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

    //   this.setFocusOnInput(nextItem);
    //   // var nextElement = document.getElementById(String(nextItem.id));
    //   // console.log(nextItem.id);
    //   // nextElement.focus();
      
    // }
    }
  }

  // Remove an item from the specified list
  private removeItem(itemToRemove: ToDo, listToRemoveFrom: ToDo[]){
    let curIndex = listToRemoveFrom.indexOf(itemToRemove);
    listToRemoveFrom.splice(curIndex, 1);
  }
}