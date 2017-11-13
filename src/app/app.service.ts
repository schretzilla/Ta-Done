//This is the highest level service

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Project } from './project';

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

    //constructor() { }
}