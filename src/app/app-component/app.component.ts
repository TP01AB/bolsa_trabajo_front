import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bolsa trabajo CIFP Virgen de Gracia';
  themeDark: boolean;

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.themeDark = localStorage.getItem('theme') === "dark" ? true : false;
}

}
