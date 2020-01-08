import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-reports-popovercomponent',
  templateUrl: './reports-popovercomponent.component.html',
  styleUrls: ['./reports-popovercomponent.component.scss'],
})
export class ReportsPopovercomponentComponent implements OnInit {

  constructor(public popoverController:PopoverController) { }

  ngOnInit() {}

  refresh() {
    console.log("refresh");
    this.popoverController.dismiss("refresh");
  }

  sortByCitys() {
    console.log("sortByCitys");
    this.popoverController.dismiss("city");
  }

  sortByDate() {
    console.log("sortByDate");
    this.popoverController.dismiss("date");
  }

  sortByStatus() {
    console.log("sortByStatus");
    this.popoverController.dismiss("status");
  }
}
