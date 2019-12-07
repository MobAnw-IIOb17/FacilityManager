import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-popovercomponent',
  templateUrl: './popovercomponent.page.html',
  styleUrls: ['./popovercomponent.page.scss'],
})
export class PopovercomponentPage implements OnInit {

  controlPopOverNames = ['Dachboden','Keller','Hof','Briefkästen','Fassade','Fahrradraum'];

  constructor(private popover:PopoverController, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  closePopover() {
    this.popover.dismiss();
  }

  async add(itemname:string) {
    if(itemname === 'new') {
      this.popover.dismiss();
      this.router.navigateByUrl('/tabs/object-manager-control-new');
    } else {
      const toast = await this.toastController.create({
        message: itemname,
        duration: 1000
      });
      toast.present();

      let navigationExtras: NavigationExtras = {
        queryParams: {
         // special: JSON.stringify(this.itemname)
          special: itemname
        }
      };
      this.router.navigate(['/tabs/object-manager-control-list'], navigationExtras);
      this.popover.dismiss();
    }
  }
}
