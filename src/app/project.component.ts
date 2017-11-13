import { Component, Output, OnDestroy } from '@angular/core';
import { Project } from './project';

// Services
import  { AppService } from './app.service';
import { Subscription } from 'rxjs/Subscription';

// Project Detail Service
import { ProjectService } from './project.service';

@Component({
    selector: 'project',
    templateUrl: 'project.Component.html',
    providers: [ProjectService]
})

export class ProjectComponent {

    //List of projects
    firstProject = new Project(1);
    projects = [ this.firstProject];
    projectId = 2;
    currentProject = this.firstProject;

    // Subscription
    subscription: Subscription;

    //Constructor
    constructor(private appService: AppService, private ProjectService: ProjectService) {
        ProjectService.projectNameChanged$.subscribe(
            projectName => {
                this.currentProject.name = projectName;
                
            }
        )
    }

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
         this.appService.currentProjectChanged(selectedProject);
    }
}