import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Checklist } from '../model/checklist.model';
import { GalleryService } from '../services/gallery.service';
import { IonCheckbox, IonTextarea, IonContent, Platform } from '@ionic/angular';
import { ChecklistItem } from "../model/checklist-item.model";
import { MatGridList } from '@angular/material';

@Component({
    selector: 'app-object-manager-control-view',
    templateUrl: './object-manager-control-view.page.html',
    styleUrls: ['./object-manager-control-view.page.scss'],
})
export class ObjectManagerControlViewPage implements OnInit {

    @ViewChild(IonContent, { static: false }) theContent: IonContent;

    private name: string;
    private labels: Array<ChecklistItem> = [];
    private checklist = new Checklist();
    private valid = false;
    private grids: Array<HTMLElement> = [];
    private backRoute: string = "/tabs/object-manager-control-list";

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private galleryService: GalleryService,
        private platform: Platform) {
        this.route.params.subscribe(() => {
            const state = this.router.getCurrentNavigation().extras.state;
            if (state) {
                this.checklist = state.checklist;

                //Wenn Item.name backToNew da ist, dann zurück nach new setzen und löschen, sonst nach list
                this.checklist.items.forEach((item) => {
                    if (item.name === "backToNew") {
                        this.backRoute = "/tabs/object-manager-control-new";
                        this.checklist.items.pop();
                    }
                });
                this.name = this.checklist.name;
                this.labels = this.checklist.items;
            }
            try {
                this.fillLabels();
            } catch (ex) {

            }

        });
    }

    ngOnInit() { }

    /**
     * Aktualisiert die Liste beim öffnen der Page
     * und Scrollt nach oben
     */
    ionViewDidEnter() {
        this.theContent.scrollToTop(500);

        this.grids = document.getElementsByClassName('grids') as unknown as Array<HTMLElement>;
        for (let i = 0; i < this.labels.length; i++) {
            this.galleryService.makeGallery(this.grids[i], this.checklist.items[i].images, true);
        }

        //Handle für device back button
        this.platform.backButton.subscribeWithPriority(0, () => {
            this.router.navigateByUrl(this.backRoute);
        });
    }

    ngAfterViewInit() {
        this.fillLabels();
        this.checkValidation();
    }
    setValue(s: string, thislabel) {
        thislabel.description = s;
        this.checkValidation();
    }
    fillLabels() {
        const text = document.getElementsByClassName('descr') as unknown as Array<IonTextarea>;
        const check = document.getElementsByClassName('checkboxes') as unknown as Array<IonCheckbox>;
        for (let i = 0; i < this.labels.length; i++) {
            text[i].value = this.labels[i].description;
            check[i].checked = this.labels[i].is_ok;
        }
    }
    checkCheckbox(item, checkbox) {
        if (checkbox.checked) {
            for (let i = 0; i < this.labels.length; i++) {
                if (item.name === this.labels[i].name) {
                    this.labels[i].is_ok = true;
                }
            }
        } else {
            for (let i = 0; i < this.labels.length; i++) {
                if (item.name === this.labels[i].name) {
                    this.labels[i].is_ok = false;
                }
            }
        }
        this.checkValidation();
    }

    checkValidation() {
        const text = document.getElementsByClassName('descr') as unknown as Array<IonTextarea>;
        const check = document.getElementsByClassName('checkboxes') as unknown as Array<IonCheckbox>;
        const btn = document.getElementById('viewButton');
        for (let i = 0; i < text.length; i++) {
            if ((!check[i].checked && text[i].value !== '') || check[i].checked) {
                this.valid = true;
            } else {
                if (check[i].checked === false) {
                    this.valid = false;
                    break;
                }
            }
        }
        if (this.valid) {
            btn.setAttribute('disabled', 'false');
        } else {
            btn.setAttribute('disabled', 'true');
        }
    }

    openCamera(item: ChecklistItem) {
        for (let i = 0; i < this.labels.length; i++) {
            if (item.name == this.labels[i].name) {
                this.galleryService.makeGallery(this.grids[i], this.checklist.items[i].images, true);
            }
        }
        this.galleryService.addCameraPicture();
    }

    openGallery(item: ChecklistItem) {

        for (let i = 0; i < this.labels.length; i++) {
            if (item.name == this.labels[i].name) {
                this.galleryService.makeGallery(this.grids[i], this.checklist.items[i].images, true);
            }
        }
        this.galleryService.addGalleryPicture();
    }

    submit() {
        this.checklist.items = this.labels;
        this.router.navigate(['/tabs/object-manager-control-list'], { state: { checklist: this.checklist } });
    }
    customTrackBy(index: number, obj: any): any {
        return index;
    }
}
