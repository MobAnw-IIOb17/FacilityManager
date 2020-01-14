import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {Checklist} from '../model/checklist.model';
import {GalleryService} from '../services/gallery.service';
import {IonCheckbox, IonTextarea, IonContent} from '@ionic/angular';
import {ChecklistItem} from "../model/checklist-item.model";

@Component({
    selector: 'app-object-manager-control-view',
    templateUrl: './object-manager-control-view.page.html',
    styleUrls: ['./object-manager-control-view.page.scss'],
})
export class ObjectManagerControlViewPage implements OnInit {

    @ViewChild(IonContent, {static: false}) theContent: IonContent;
    
    private name: string;
    private labels: Array<ChecklistItem> = [];
    private checklist = new Checklist();
    private valid = false;
    private pictures: string[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private galleryService_01: GalleryService) {
        this.route.params.subscribe(() => {
            const state = this.router.getCurrentNavigation().extras.state;
            if (state) {
                this.checklist = state.checklist;
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
    }

    ngAfterViewInit() {
        this.fillLabels();
        this.checkValidation();
        this.galleryService_01.makeGallery(document.getElementById('gallery-grid_01'), [''], false);
    }
    setValue(s: string, thislabel) {
      thislabel.description = s;
      this.checkValidation();
    }
    fillLabels() {
        const text = document.getElementsByClassName('descr')as unknown as Array<IonTextarea>;
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

    openCamera() {

    }

    openPhotos() {

    }

    submit() {
        this.checklist.items = this.labels;
        this.router.navigate(['/tabs/object-manager-control-list'], {state: {checklist: this.checklist}});
    }
    customTrackBy(index: number, obj: any): any {
        return index;
    }

}
