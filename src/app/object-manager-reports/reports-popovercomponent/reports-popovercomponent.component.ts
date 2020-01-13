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
    this.popoverController.dismiss("refresh");
  }

  sortByCitys() {
    this.popoverController.dismiss("city");
  }
  sortByDate() {
    this.popoverController.dismiss("date");
  }

  sortByStatus() {
    this.popoverController.dismiss("status");
  }
}
