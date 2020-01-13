import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {Router, NavigationExtras} from '@angular/router';
import {ChecklistItem} from '../model/checklist-item.model';
import {Checklist} from '../model/checklist.model';
import {invalid} from '@angular/compiler/src/render3/view/util';


@Component({
    selector: 'app-object-manager-control-new',
    templateUrl: './object-manager-control-new.page.html',
    styleUrls: ['./object-manager-control-new.page.scss'],
})
export class ObjectManagerControlNewPage implements OnInit {
    public myForm: FormGroup;
    private PropertiesCount = 0;
    private label = [];
    private Kname: string;
    private text = '';
    private valid = false;

    constructor(private formBuilder: FormBuilder, private router: Router) {
        this.myForm = formBuilder.group({
            Propertie0: []
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.checkValidate();
    }

    setValue(s: string, target) {
        const x = document.getElementsByClassName('Klabels');
        for (let i = 0; i < x.length; i++) {
            if (x[i].children[0].getAttribute('name') === target) {
                x[i].setAttribute('value', s);
                break;
            }
        }
        this.checkValidate();
    }

    submit() {
        const checklist = new Checklist();
        const x = document.getElementsByClassName('Klabels');
        this.Kname = x[0].getAttribute('value');
        for (let i = 1; i < x.length; i++) {
            this.label.push(x[i].getAttribute('value'));
        }
        checklist.name = this.Kname;
        checklist.items = [];
        for (let i = 0; i < this.label.length; i++) {
            const item: ChecklistItem = {name: this.label[i], description: '', images: [], isOk: false};
            checklist.items.push(item);
        }
        this.router.navigate(['/tabs/object-manager-control-view'], {state: {checklist}});

    }

    checkValidate() {
        const input = document.getElementsByClassName('Klabels');
        for (let i = 0; i < input.length; i++) {
            if (input[i].getAttribute('value') !== '') {
                console.log(input[i]);
                this.valid = true;
            } else {
                this.valid = false;
                break;
            }
        }
        if (this.valid) {
            document.getElementById('sub').setAttribute('disabled', 'false');
        } else {
            document.getElementById('sub').setAttribute('disabled', 'true');
        }
    }

    addControl() {
        this.PropertiesCount++;
        this.myForm.addControl('Propertie' + this.PropertiesCount, new FormControl());
        document.getElementById('sub').setAttribute('disabled', 'true');
        this.checkValidate();
    }

    removeControl(control) {
        this.myForm.removeControl(control.key);
        document.getElementById('sub').setAttribute('disabled', 'true');
        this.checkValidate();
    }
}
