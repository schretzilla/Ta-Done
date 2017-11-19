import { Component } from '@angular/core';

// Services
import { AppService } from '../app.service';

// Necessary Classes
import { ToDo } from '../to-do/to-do';
import { Project } from '../project/project';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AppService]
})

export class HomeComponent {
  title = 'Ta-Done';

  //The ToDo in current focus
  currentProject = null;

  constructor(private appService: AppService){
    appService.currentProjectChanged$.subscribe(
      project => {
        this.currentProject = project;
        console.log("Project changed in app");
        
      }
    );
  }

  setFocusOnInput(nextItem: ToDo){
    var nextElement = document.getElementById(String(nextItem.id));
    console.log(nextItem.id);
    nextElement.focus();
  }
}





