import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-deletePopover',
  templateUrl: './deletePopover.page.html',
  styleUrls: ['./deletePopover.page.scss'],
})
export class DeletePopoverPage implements OnInit, AfterViewInit {

  public index;
  public galleryService;
  public src;
  public deletable: boolean = false;

  constructor(private popover:PopoverController) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    document.getElementById("Base64Img").setAttribute("src",this.src);
  }

  dismiss(){
    this.popover.dismiss();
  }

  delete(){
    this.galleryService.deleteFromGallery(this.index);
    this.popover.dismiss();
  }
}
