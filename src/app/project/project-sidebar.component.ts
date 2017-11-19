import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from './project';

// Services
import  { AppService } from '../app.service';
import { Subscription } from 'rxjs/Subscription';
import { log } from 'util';


@Component({
    selector: 'project-sidebar',
    templateUrl: 'project-sidebar.component.html',
    styleUrls: ['../app.component.css'],    
})

export class ProjectSidebarComponent implements OnInit{

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
        
        let testProject = JSON.parse(localStorage.getItem('projects'));
        
        console.log('test project storage ' + testProject.name);
    }

    ngOnInit() {
        //TODO - split out into service
        
        this.projects = JSON.parse(localStorage.getItem('projects'));
        
        // Check if this is a fresh session
        if (this.projects == null ){
            //fresh session
            this.projects = [];
        }
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