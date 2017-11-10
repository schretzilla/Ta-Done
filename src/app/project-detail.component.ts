import { Component, Input } from '@angular/core';
import { Project } from './project';

@Component({
  selector: 'project-detail',
  template: `<input id={{project.id}}
    (keyup.enter)="onEnterKey($event, project)" 
    (keyup.backspace)="onDeleteKey($event, project)"
    [(ngModel)]="project.name">
  `
})
export class ProjectDetailComponent {
  @Input() project: Project;
}