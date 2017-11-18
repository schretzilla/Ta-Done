import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectComponent } from './project.component';
import { ToDoComponent } from './to-do.component';

import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectDetailComponent,
    ProjectComponent,
    ToDoComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule // <-- import the FormsModule before binding with [(ngModel)]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
