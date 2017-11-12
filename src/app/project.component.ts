import { Component, EventEmitter, Output } from '@angular/core';
import { Project } from './project';

@Component({
    selector: 'project',
    templateUrl: 'project.Component.html'
})

export class ProjectComponent {

    //List of projects
    firstProject = new Project(1);
    projects = [ this.firstProject];
    projectId = 2;
    currentProject = this.firstProject;
    //Adds a new project to the projects list
    addProject() {
        let newProject = new Project(this.projectId);
        this.projects.push(newProject);

        //increment project id
        this.projectId+=1;
    }

    // Sets the selected project as the current project
    onProjectSelect(selectedProject: Project){
    this.currentProject = selectedProject;
  }
}