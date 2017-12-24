import { Component } from '@angular/core';

// Services
import { ProjectService } from '../services/project.service';

// Necessary Classes
import { ToDo } from '../to-do/to-do';
import { Project } from '../project/project';
import { log } from 'util';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ProjectService]
})

export class HomeComponent {
  title = 'Ta-Done';

  //The ToDo in current focus
  currentProject = null;

  constructor(private ProjectService: ProjectService){
    ProjectService.currentProjectChanged$.subscribe(
      project => {
        this.currentProject = project;        
      }
    );
  }

  // Persist project name changes to storage
  projectNameChange(currentProject: Project){
    this.ProjectService.updateProject(currentProject);
  }

  setFocusOnInput(nextItem: ToDo){
    var nextElement = document.getElementById(String(nextItem.id));
    nextElement.focus();
  }

  //Delete the selected project from local storage
  deleteProject(project: Project){
    //Set the current project to null to change the page 
    this.ProjectService.currentProjectChanged(null);  

    this.ProjectService.deleteProject(project);
  }
}





