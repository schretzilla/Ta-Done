import { Component, Input } from '@angular/core';
import { Project } from './project';

// Project Detail Service
import { ProjectService } from './project.service';

@Component({
  selector: 'project-detail',
  templateUrl: 'project-detail.component.html'
})
export class ProjectDetailComponent {
  @Input() project: Project;

  // Constructor
  constructor(private projectService: ProjectService){

  }

  onProjectNameChange(event: KeyboardEvent, newProjectName: string){
    //this.project.name = newProjectName;
  }

}