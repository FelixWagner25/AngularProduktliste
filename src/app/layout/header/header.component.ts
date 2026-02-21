import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  btnClassList = "btn--primary"

  path: string = "";
  btnText = "Neues Produkt"

  ngOnInit(){
    this.path = "";
    if(this.path=="detail"){
      this.btnText = "zurück zur Liste"
    }
  }
}
