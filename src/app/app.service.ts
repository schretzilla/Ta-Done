//This is the highest level service
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Project } from './project/project';
import { ToDo } from './to-do/to-do';

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

  // Observable string sources
  private ProjectListChangedSource = new Subject<Project[]>();
  //Observable string streams
  projectListChanged$ = this.ProjectListChangedSource.asObservable();
  // Service message commands
  projectListChanged(projectList: Project[]){
    this.ProjectListChangedSource.next(projectList);
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

  // Updates a project and persists it to storage
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
    
    // Notify that the projects list has changed
    this.projectListChanged(projects);
  }

  // Deletes the specified project from storage
  deleteProject(projectToDelete: Project){

    //get the current projects list
    let projects = this.getProjects();  
    
    //find the index of the current project to udpate
    let projectToRemove = projects.find(x => x.id == projectToDelete.id);
    let indexOfProject = projects.indexOf(projectToRemove);

    // remove the project from the list
    projects.splice(indexOfProject, 1);

    //persist the projects to local storage
    localStorage.setItem('projects', JSON.stringify(projects));
    
    // Notify that the projects list has changed
    this.projectListChanged(projects);
  }

}