import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-object-manager-control-new',
  templateUrl: './object-manager-control-new.page.html',
  styleUrls: ['./object-manager-control-new.page.scss'],
})
export class ObjectManagerControlNewPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  addPropertie(){
    console.log(document.getElementById("newControlProperties").innerHTML);
    document.getElementById("newControlProperties").innerHTML += "<ion-item><ion-label position='floating'>Eigenschaft</ion-label><ion-input></ion-input></ion-item>";
    console.log(document.getElementById("newControlProperties").innerHTML);
  }
}
