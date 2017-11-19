//This is the highest level service
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Project } from './project/project';

@Injectable()
export class AppService {

    // Observable string sources
    private CurrentProjectChangedSource = new Subject<Project>();

    // private ProjectAddedsource = new Subject<Project>();

    // Observable string streams
    currentProjectChanged$ = this.CurrentProjectChangedSource.asObservable();

    // Service message commands
    currentProjectChanged(projectName: Project) {
        this.CurrentProjectChangedSource.next(projectName);
    }

    // Gets all projects or returns an empty list if none exist in the session
    getProjects() {
        let projects = JSON.parse(localStorage.getItem('projects'));  

        // Set to an empty list during a fresh session
        if (projects == null ){
            projects = [];
        }
        return projects;
    }

}