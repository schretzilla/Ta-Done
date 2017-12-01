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
    projectId = JSON.parse(localStorage.getItem('projects')).length;

    // Subscription
    subscription: Subscription;

    //Constructor
    constructor(private appService: AppService) {
			this.appService.currentProjectChanged$.subscribe(
					project => {
							console.log("Project Comp here")
					}
			);
			console.log("Current Project " + this.currentProject);
			
			this.appService.projectListChanged$.subscribe(
					projects => {
							this.projects = projects;
					}
			)
    }

    ngOnInit() {
			// Load the sessions projects
			this.projects = this.appService.getProjects();
    }

    //Adds a new project to the projects list
    addProject() {
			let newProject = new Project(this.projectId);
			newProject.name = "New Project";
			// this.projects.push(newProject);
			this.appService.addProjects(newProject);

			// let whipeProjects = [];
			// localStorage.setItem('projects', JSON.stringify(whipeProjects)); 
					
			//increment project id
			this.projectId+=1;

			//update list of projects
      this.projects = this.appService.getProjects();
    }

    // Sets the selected project as the current project
    onProjectSelect(selectedProject: Project){
			console.log("Project changed in project comp to " + selectedProject.name);			
			this.currentProject = selectedProject;
			this.appService.currentProjectChanged(selectedProject);
        
    }
}