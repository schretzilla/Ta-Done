import {Component} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isIn = false; // store in state

  toggleMenu() {
    let isItIn = this.isIn; 
    if (this.isIn === true ) {
      this.isIn = false;
    } else {
      this.isIn = true;
    }
  }
}