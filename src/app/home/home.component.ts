import { Component } from '@angular/core';

// Services
import { AppService } from '../app.service';

// Necessary Classes
import { ToDo } from '../to-do/to-do';
import { Project } from '../project/project';
import { log } from 'util';

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
      }
    );
  }

  // Persist project name changes to storage
  projectNameChange(currentProject: Project){
    this.appService.updateProject(currentProject);
  }

  setFocusOnInput(nextItem: ToDo){
    var nextElement = document.getElementById(String(nextItem.id));
    console.log(nextItem.id);
    nextElement.focus();
  }

  //Delete the selected project from local storage
  deleteProject(project: Project){
    let projects = this.appService.getProjects();
    //find the index of the current project to udpate
    let projectToUpdate = projects.find(x => x.id == project.id);
    let indexOfProject = projects.indexOf(projectToUpdate);

    // remove the project from the list
    // projects.splice(indexOfProject, 1);
    // log("Project to delete " + project.name);
    // this.currentProject=projects[0];
    // log("The now current project"  + this.currentProject.name);
    // this.appService.projectListChanged(projects);
    // this.appService.currentProjectChanged(this.currentProject);

    //this.appService.currentProjectChanged(projects[0]);
    this.appService.deleteProject(project);
  }
}





