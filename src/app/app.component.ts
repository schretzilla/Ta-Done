import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TaDone';
  currentToDo: ToDo;
  todos =  [ new ToDo("", 1)];
  listId = 2;

  onSelect(todo: ToDo): void {
    this.currentToDo = todo;
  }

  onEnterKey(event: KeyboardEvent, curItem: ToDo) {
    var index = this.todos.indexOf(curItem);

    var newToDo = new ToDo("", this.listId);
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
export class ToDo {
  id: number;
  message: string;

  constructor(message: string, id: number) {
    this.message = message;
    this.id = id;
  }
}


