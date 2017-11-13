// Project service for project and its details

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProjectService {

    // Observable string sources
    private ProjectNameChangeSource = new Subject<string>();

    // Observable string streams
    projectNameChanged$ = this.ProjectNameChangeSource.asObservable();

    // Service message commands
    projectNameChanged(newProjectName: string) {
        this.ProjectNameChangeSource.next(newProjectName);
    }
}