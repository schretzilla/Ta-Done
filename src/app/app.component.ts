import { Component } from '@angular/core';

// Services
import { ProjectService } from './services/project.service';

// Necessary Classes
import { ToDo } from './to-do/to-do';
import { Project } from './project/project';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProjectService]
})

export class AppComponent {
  title = 'Ta-Done';

  //The ToDo in current focus
  currentProject = null;

  constructor(private projectService: ProjectService){
    projectService.currentProjectChanged$.subscribe(
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





