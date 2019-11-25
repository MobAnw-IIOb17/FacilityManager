import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-damage-details',
  templateUrl: './damage-details.page.html',
  styleUrls: ['./damage-details.page.scss'],
})
export class DamageDetailsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  place: string = "Görlitz";
  address: string = "Brückenstraße 1";
  location: string = "2. Stock, Zimmer 303";
  tenant: string = "Der Weihnachtsmann";
  date: Date = new Date('11/26/19');
  description: string = "Kamin fehlt";
}
