import { Component, OnDestroy } from '@angular/core';
import { Project } from './project';

// Services
import  { AppService } from '../app.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
    selector: 'project-sidebar',
    templateUrl: 'project-sidebar.component.html',
    styleUrls: ['../app.component.css'],    
})

export class ProjectSidebarComponent {

    //List of projects
    projects = [];
    currentProject = null;
    projectId = 1;

    // Subscription
    subscription: Subscription;

    //Constructor
    constructor(private appService: AppService) {
        // Initialize first project
        // let firstProject = new Project(1);
        // firstProject.name = "My First Project";
        // this.projects.push(firstProject);

        this.appService.currentProjectChanged$.subscribe(
            project => {
                console.log("Project Comp here")
            }
        );
        console.log(this.currentProject);
        
    }

    //Adds a new project to the projects list
    addProject() {
        let newProject = new Project(this.projectId);
        newProject.name = "New Project";
        this.projects.push(newProject);

        //increment project id
        this.projectId+=1;
    }

    // Sets the selected project as the current project
    onProjectSelect(selectedProject: Project){
        this.currentProject = selectedProject;
        this.appService.currentProjectChanged(selectedProject);
        console.log("Project changed in project comp");
        
    }
}