import { Component, Input } from '@angular/core';
import { Project } from './project';

// Services
import { AppService } from '../app.service';

@Component({
  selector: 'project-detail',
  templateUrl: 'project-detail.component.html'
})
export class ProjectDetailComponent {
  @Input() project: Project;

  //TODO remove
  constructor(private appService: AppService){
    appService.currentProjectChanged$.subscribe(
      project => {        
      }
    );
  }
}