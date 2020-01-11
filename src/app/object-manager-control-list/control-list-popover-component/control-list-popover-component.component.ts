import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control-list-popover-component',
  templateUrl: './control-list-popover-component.component.html',
  styleUrls: ['./control-list-popover-component.component.scss'],
})
export class ControlListPopoverComponentComponent implements OnInit {

  constructor(private popoverController:PopoverController, private router: Router) { }

  ngOnInit() {}

  /**
   * Fügt das angeklickte Item im Popover zu der Liste in der Hauptseite hinzu.
   * oder leitet auf die Page für die Erstellung einer neuen Kontrolle
   * 
   * @param selectedItem Item welches übergeben wird
   */
  async add(selectedItem) {
    if(selectedItem == 'new') {
      this.popoverController.dismiss('new');
      this.router.navigateByUrl('/tabs/object-manager-control-new');
    } else {
      this.popoverController.dismiss(JSON.stringify(selectedItem), 'add');
    }
  }
}
