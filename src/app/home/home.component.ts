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

  projectNameChange(currentProject: Project){
    this.appService.updateProject(currentProject);

    // console.log("Project new name " + currentProject.name);
    // let projects = this.appService.getProjects();
    // console.log(projects);
    // let projectToUpdate = projects.find(x => x.id == currentProject.id);
    // let indexOfProjToUpdate = projects.indexOf(projectToUpdate);
    // console.log("project to update " + projectToUpdate.name);
    // console.log("project to updates index " + indexOfProjToUpdate);

    // //update projects list
    // projects[indexOfProjToUpdate] = currentProject;
    // localStorage.setItem('projects', JSON.stringify(projects));

    // projec
  }
  setFocusOnInput(nextItem: ToDo){
    var nextElement = document.getElementById(String(nextItem.id));
    console.log(nextItem.id);
    nextElement.focus();
  }
}





