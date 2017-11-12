//This is the highest level service

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppService {

    // Observable string sources
    private CurrentProjectChangedSource = new Subject<string>();

    // Observable string streams
    currentProjectChanged$ = this.CurrentProjectChangedSource.asObservable();

    // Service message commands
    currentProjectChanged(projectName: string) {
        this.CurrentProjectChangedSource.next(projectName);
    }

    //constructor() { }
}