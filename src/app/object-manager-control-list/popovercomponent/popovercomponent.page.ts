import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { Checklist } from 'src/app/model/checklist.model';

@Component({
  selector: 'app-popovercomponent',
  templateUrl: './popovercomponent.page.html',
  styleUrls: ['./popovercomponent.page.scss'],
})
export class PopovercomponentPage implements OnInit {

  notUsedControllistItems: Array<Checklist> = [];

  constructor(private popover:PopoverController, private router: Router, private toastController: ToastController) {
  }

  ngOnInit() {
  }

  /**
   * Fügt das angeklickte Item im Popover zu der Liste in der Hauptseite hinzu.
   * 
   * @param selectedItem Item welches übergeben wird
   */
  async add(selectedItem) {
    if(selectedItem == 'new') {
      this.popover.dismiss();
      this.router.navigateByUrl('/tabs/object-manager-control-new');
    } else {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          popOverData: JSON.stringify(selectedItem)
        }
      };
      this.router.navigate(['/tabs/object-manager-control-list'], navigationExtras);
      this.popover.dismiss();
    }
  }
}
