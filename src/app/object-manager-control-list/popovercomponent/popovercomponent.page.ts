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

  controlItemNames: Array<Checklist> = [];
  // = ['Dachboden','Keller','Hof','Briefkästen','Fassade','Fahrradraum'];

  constructor(private popover:PopoverController, private router: Router, private toastController: ToastController) {
  }

  ngOnInit() {
  }

  closePopover() {
    this.popover.dismiss();
  }

  async add(selectedItem) {
    console.log(selectedItem);
    if(selectedItem == 'new') {
      this.popover.dismiss();
      this.router.navigateByUrl('/tabs/object-manager-control-new');
    } else {
      const toast = await this.toastController.create({
        message: selectedItem.name,
        duration: 1000
      });
      toast.present();

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
