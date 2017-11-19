import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here

// Routing
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProjectDetailComponent } from './project/project-detail.component';
import { ProjectComponent } from './project/project.component';
import { ToDoComponent } from './to-do/to-do.component';
import { ProjectSidebarComponent } from './project/project-sidebar.component';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'projects', component: ProjectComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectDetailComponent,
    ProjectComponent,
    ToDoComponent,
    HeaderComponent,
    HomeComponent,
    ProjectSidebarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    RouterModule.forRoot(   //TODO split into it's own routing module file
      appRoutes,
      { enableTracing: true } //for debugging purposes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
