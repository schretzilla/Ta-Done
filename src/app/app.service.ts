//This is the highest level service
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Project } from './project/project';

@Injectable()
export class AppService {

  // Observable string sources
  private CurrentProjectChangedSource = new Subject<Project>();

  // Observable string streams
  currentProjectChanged$ = this.CurrentProjectChangedSource.asObservable();

  // Service message commands
  currentProjectChanged(projectName: Project) {
    this.CurrentProjectChangedSource.next(projectName);
  }

  //TODO Split out into project services before this gets too busy

  // Gets all projects or returns an empty list if none exist in the session
  getProjects() {
    let projects = JSON.parse(localStorage.getItem('projects'));  

    // Set to an empty list during a fresh session
    if (projects == null ){
        projects = [];
    }
    return projects;
  }

  updateProject(curProject: Project) {
    //get the current projects list
    let projects = this.getProjects();

    //find the index of the current project to udpate
    let projectToUpdate = projects.find(x => x.id == curProject.id);
    let indexOfProjToUpdate = projects.indexOf(projectToUpdate);

    //update that project
    projects[indexOfProjToUpdate] = curProject;

    // persist that to storage
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  // Add a new project to the project local storage
  addProjects(newProject: Project) {
    let projects = JSON.parse(localStorage.getItem('projects'));  
    projects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(projects));    
  }

}