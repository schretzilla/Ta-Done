import { Component, Input } from '@angular/core';
import { Project } from './project';

@Component({
  selector: 'project-detail',
  templateUrl: 'project-detail.component.html'
})
export class ProjectDetailComponent {
  @Input() project: Project;

}