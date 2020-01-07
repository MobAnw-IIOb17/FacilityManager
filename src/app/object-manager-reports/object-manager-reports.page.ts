import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from '../model/property.model';

@Component({
  selector: 'app-object-manager-reports',
  templateUrl: './object-manager-reports.page.html',
  styleUrls: ['./object-manager-reports.page.scss'],
})
export class ObjectManagerReportsPage implements OnInit {

  objectItems: Array<Property> = []

  constructor(private router: Router) { }

  ngOnInit() {
    this.objectItems.push({
      uid: "1",
      deleted: "1",
      hidden: "0",
      title: "",
      street: "Obere Dorf 23",
      zip: "02708",
      city: "Löbau",
      owner: "Hans"
    });
    
    this.objectItems.push({
      uid: "2",
      deleted: "0",
      hidden: "0",
      title: "",
      street: "Unter Dorf 2",
      zip: "48302",
      city: "Görlitz",
      owner: "Peter"
    });
    
    this.objectItems.push({
      uid: "3",
      deleted: "0",
      hidden: "0",
      title: "",
      street: "Obere Schiller 6",
      zip: "57493",
      city: "Bautzen",
      owner: "Achim"
    });
  }

  navToControlManagerNewPage() {
    this.router.navigateByUrl('/tabs/object-manager-new');
  }

  doRefresh(event) {
    console.log('Begin async operation');

    //Hier Daten Aktualieren
    this.Data1();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 800);
  }

  Data1() {
    this.objectItems.pop();
    this.objectItems.pop();
    this.objectItems.pop();   
    
    this.objectItems.push({
      uid: "1",
      deleted: "1",
      hidden: "0",
      title: "",
      street: "Obere Dorf ",
      zip: "02708",
      city: "Löbau",
      owner: "Hans"
    });
    
    this.objectItems.push({
      uid: "2",
      deleted: "1",
      hidden: "0",
      title: "",
      street: "Unter Dorf",
      zip: "48302",
      city: "Görlitz",
      owner: "Peter"
    });
    
    this.objectItems.push({
      uid: "3",
      deleted: "1",
      hidden: "0",
      title: "",
      street: "Obere Schiller",
      zip: "57493",
      city: "Bautzen",
      owner: "Achim"
    });
  }
}
