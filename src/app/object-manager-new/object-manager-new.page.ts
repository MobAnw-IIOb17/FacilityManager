import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-object-manager-new',
  templateUrl: './object-manager-new.page.html',
  styleUrls: ['./object-manager-new.page.scss'],
})
export class ObjectManagerNewPage implements OnInit {

  orig = ['Eins','Zwei','Drei'];
  items = [];

  constructor() { }

  ngOnInit() {
  }
  predictiveSearch(event) {
    
    this.items = this.orig.filter((i) => {
      return i.toLowerCase().includes(event.target.value.toLowerCase());
    });
  }
}
