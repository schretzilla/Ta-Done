import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from './project';

// Services
import  { AppService } from '../app.service';
import { Subscription } from 'rxjs/Subscription';
import { log } from 'util';


@Component({
    selector: 'project',
    templateUrl: 'project.Component.html',
    styleUrls: ['../app.component.css', './project.component.css'],
    
})

export class ProjectComponent implements OnInit {

    //List of projects
    projects = [];
    currentProject = null;
    projectId = 1;

    // Subscription
    subscription: Subscription;

    //Constructor
    constructor(private appService: AppService) {
        //TODO is this needed? 
        this.appService.currentProjectChanged$.subscribe(
            project => {
                console.log("Project Comp here")
            }
        );
    }

    ngOnInit() {
        this.projects =this.appService.getProjects();
    }

    //Adds a new project to the projects list
    addProject() {
        let newProject = new Project(this.projectId);
        newProject.name = "New Project";
        this.projects.push(newProject);

        //increment project id
        this.projectId+=1;    
        localStorage.setItem('projects', JSON.stringify(this.projects));
    }

    // Sets the selected project as the current project
    onProjectSelect(selectedProject: Project){
        this.currentProject = selectedProject;
        this.appService.currentProjectChanged(selectedProject);
        
    }
}