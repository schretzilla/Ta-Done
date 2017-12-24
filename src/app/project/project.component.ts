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

	// Stores the next available project id;
	projectId = 0;
	
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
		this.projectId = this.getMaxProjectId();
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

	// Find the next ID for the list of projects
	// TODO: Use until database is created
	getMaxProjectId(){
		let maxProjectId = 1;
		for(let i=0; i<this.projects.length; i++){
			let curProject = this.projects[i];
			if(curProject.id > maxProjectId){
				maxProjectId = curProject.id;
			}
		}
		//increment the max project id by 1
		maxProjectId += 1;
		return maxProjectId;
	}
}