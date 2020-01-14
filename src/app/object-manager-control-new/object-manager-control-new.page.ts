import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {Router, NavigationExtras} from '@angular/router';
import {ChecklistItem} from '../model/checklist-item.model';
import {Checklist} from '../model/checklist.model';
import {invalid} from '@angular/compiler/src/render3/view/util';
import { IonInput } from '@ionic/angular';


@Component({
    selector: 'app-object-manager-control-new',
    templateUrl: './object-manager-control-new.page.html',
    styleUrls: ['./object-manager-control-new.page.scss'],
})
export class ObjectManagerControlNewPage implements OnInit {
    private labels = [""];
    private valid = false;
    private validName = false;

    constructor(private router: Router) { }

    ngOnInit() { }

    ngAfterViewInit() {
        this.checkValidate();
    }
    setName(s: string) {
        const x = document.getElementById("NameOfLabel") as unknown as IonInput;
        x.value = s;
    }
    setValue(s: string, target) {
        const x = document.getElementsByClassName('Klabels') as unknown as Array<IonInput>;
        for (let i = 0; i < x.length; i++) {
            if (x[i].name === target) {
                this.labels[i] = s;
                x[i].value = this.labels[i];
                break;
            }
        }
        this.fillInputs();
        this.checkValidate();
    }
    fillInputs() {
        console.log(this.labels);
        const x = document.getElementsByClassName("Klabels") as unknown as Array<IonInput>;
        console.log(x)
        if(x.length>this.labels.length) {
            for(let i = 0; i < this.labels.length; i++) {
                x[i].value = this.labels[i];
            }
        }
        else {
            for(let i = 0; i < x.length; i++) {
                x[i].value = this.labels[i];
            }
            for(let i = x.length; i < this.labels.length; i++) {
                this.labels[i] = "";
            }
        }
    }
    submit() {
        const checklist = new Checklist();
        const Kname = document.getElementById("NameOfLabel") as unknown as IonInput;
        const x = document.getElementsByClassName('Klabels') as unknown as Array<IonInput>;
        checklist.name = Kname.value;
        if(this.labels.length > 0) {
            checklist.items = [];
            for (let i = 0; i < this.labels.length; i++) {
                const item: ChecklistItem = {name: this.labels[i], description: '', images: [], is_ok: false};
                checklist.items.push(item);
            }
            this.router.navigate(['/tabs/object-manager-control-view'], {state: {checklist}});
        }
        else {

        }
    }

    checkValidate() {
        const Kname = document.getElementById("NameOfLabel") as unknown as IonInput;
        const input = document.getElementsByClassName('Klabels') as unknown as Array<IonInput>;
        if(Kname.value !== '') {
            this.validName = true;
        }
        else { 
            this.validName = false
        }
        if(this.labels.length > 0){
            for (let i = 0; i < input.length; i++) {
                if (input[i].value !== '' ) {
                    this.valid = true;
                } else {
                    this.valid = false;
                    break;
                }
            }
        }
        if (this.valid && this.validName) {
            document.getElementById('sub').setAttribute('disabled', 'false');
        } else {
            document.getElementById('sub').setAttribute('disabled', 'true');
        }
        //console.log("valid: ",this.valid," for: ", input);
    }

    addControl() {
        this.labels.push("");
        document.getElementById('sub').setAttribute('disabled', 'true');
        this.fillInputs();
        this.checkValidate();
    }

    removeControl(control) {
        console.log(this.labels);
        for(let i = 0; i < this.labels.length; i++) {
            if(i == control.key) {
                this.labels.splice(i,1);
            }
        }
        document.getElementById('sub').setAttribute('disabled', 'true');
        this.fillInputs();
        this.checkValidate();
        console.log(this.labels);
    }
}
