import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router, NavigationExtras} from '@angular/router';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Checklist} from '../model/checklist.model';
import {GalleryService} from '../services/gallery.service';
import {IonCheckbox, IonTextarea} from '@ionic/angular';

@Component({
    selector: 'app-object-manager-control-view',
    templateUrl: './object-manager-control-view.page.html',
    styleUrls: ['./object-manager-control-view.page.scss'],
})
export class ObjectManagerControlViewPage implements OnInit {

    private name: string;
    private myFormNew: FormGroup;
    private labels = [];
    private checklist = new Checklist();
    private valid = false;
    private pictures: string[] = [];

    constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private galleryService_01: GalleryService) {
        this.route.params.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.checklist = this.router.getCurrentNavigation().extras.state.checklist;
                this.name = this.checklist.name;
                this.labels = this.checklist.items;
                for (let i = 0; i < this.checklist.items.length; i++) {
                    this.labels[i].description = this.checklist.items[i].description;
                }
            }
        });
        this.myFormNew = this.formBuilder.group({});
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.checkValidation();
        this.galleryService_01.makeGallery(document.getElementById('gallery-grid_01'), ['']);
    }

    setValue(s: string, name) {
        const x = document.getElementsByClassName('descr');
        for (let i = 0; i < x.length; i++) {
            if (x[i].getAttribute('name') === name) {
                this.labels[i].description = s;
            }
        }
        this.checkValidation();
    }

    checkCheckbox(item, checkbox) {
        if (checkbox.checked) {
            for (let i = 0; i < this.labels.length; i++) {
                if (item.name === this.labels[i].name) {
                    this.labels[i].isOk = true;
                }
            }
        } else {
            for (let i = 0; i < this.labels.length; i++) {
                if (item.name === this.labels[i].name) {
                    this.labels[i].isOk = false;
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
            if ((check[i].checked === false) && text[i].value !== '' || check[i].checked) {
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

}
