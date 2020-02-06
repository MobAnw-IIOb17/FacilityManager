import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { GalleryService } from '../../gallery.service';

@Component({
  selector: 'app-deletePopover',
  templateUrl: './deletePopover.page.html',
  styleUrls: ['./deletePopover.page.scss'],
})

/**
 * Popover für das Löschen von mit GalleryService erzeugten Bildern
 */

export class DeletePopoverPage {

  public index: number;
  public src_array: string[];
  public root_html: HTMLElement;

  constructor(private popover: PopoverController, private galleryService: GalleryService) {
  }

  dismiss() {
    this.popover.dismiss();
  }

  delete() {
    this.galleryService.setGallery(this.root_html, this.src_array, true);
    this.galleryService.deleteFromGallery(this.index);
    this.popover.dismiss();
  }
}
