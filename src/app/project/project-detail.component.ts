import { Component, Input } from '@angular/core';
import { Project } from './project';

// Services
import { ProjectService } from '../services/project.service';
import { CssSelector } from '@angular/compiler';

@Component({
  selector: 'project-detail',
  templateUrl: 'project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent {
  @Input() project: Project;
}