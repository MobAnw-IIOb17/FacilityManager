import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChecklistItem } from '../model/checklist-item.model';
import { Checklist } from '../model/checklist.model';
import { IonInput, Platform } from '@ionic/angular';

@Component({
    selector: 'app-object-manager-control-new',
    templateUrl: './object-manager-control-new.page.html',
    styleUrls: ['./object-manager-control-new.page.scss'],
})

export class ObjectManagerControlNewPage implements OnInit {
    private labels: Array<string> = [''];
    private valid = false;
    private validName = false;

    constructor(private router: Router, private platform: Platform) { }

    ngOnInit() { }

    ngAfterViewInit() {
        this.checkValidate();
    }
    ionViewDidEnter() {
        // Verringern der angezeigten Einträge auf 1 zuzüglich des Namens
        this.labels.splice(1);
        const input = document.getElementsByClassName('Klabels') as unknown as Array<IonInput>;
        const x = document.getElementById('NameOfLabel') as unknown as IonInput;
        // setzt gespeicherte Werte auf ""
        x.value = '';
        for (const inputItem of input) {
            inputItem.value = '';
        }
        this.checkValidate();

        // Handle für device back button
        this.platform.backButton.subscribeWithPriority(0, () => {
            this.router.navigateByUrl('/tabs/object-manager-control-list');
        });
    }
    /**
     * setzt den Namen des zu erstellenden ChecklistItems
     * @param s
     */
    setName(s: string) {
        const x = document.getElementById('NameOfLabel') as unknown as IonInput;
        x.value = s;
        this.checkValidate();
    }
    /**
     * setzt die Bezeichung der Eigenschaften des zu erstellenden ChecklistItems
     * @param s
     * @param target
     */
    setValue(s: string, target) {
        const x = document.getElementsByClassName('Klabels') as unknown as Array<IonInput>;
        for (let i = 0; i < x.length; i++) {
            if (x[i].name === target) {
                this.labels[i] = x[i].value;
            }
        }

        this.checkValidate();
    }
    /**
     * Abspeichern und Abschicken des erstellten ChecklistItem
     */
    submit() {
        const checklist = new Checklist();
        const Kname = document.getElementById('NameOfLabel') as unknown as IonInput;
        const x = document.getElementsByClassName('Klabels') as unknown as Array<IonInput>;
        checklist.name = Kname.value;
        if (this.labels.length > 0) {
            checklist.items = [];
            for (let i = 0; i < this.labels.length; i++) {
                const item: ChecklistItem = { name: this.labels[i], description: '', images: [], is_ok: false };
                checklist.items.push(item);
            }

            // Füge Dummy für device Zurück hinzu, wird unter view ausgewertet und gelöscht
            const item: ChecklistItem = { name: 'backToNew', description: '', images: [], is_ok: false };
            checklist.items.push(item);

            this.router.navigate(['/tabs/object-manager-control-view'], { state: { checklist } });
        }
    }
    /**
     * überprüfen ob benötigte Bezeichner eingegeben sind
     */
    checkValidate() {
        const Kname = document.getElementById('NameOfLabel') as unknown as IonInput;
        const input = document.getElementsByClassName('Klabels') as unknown as Array<IonInput>;
        this.valid = false;
        this.validName = false;
        if (Kname.value !== '') {
            this.validName = true;
        } else {
            this.validName = false
        }
        if (this.labels.length > 0) {
            for (let i = 0; i < input.length; i++) {
                if (input[i].value !== '') {
                    this.valid = true;
                } else {
                    if (this.labels[i] !== '') {
                        this.valid = true;
                    } else {
                        this.valid = false;
                        break;
                    }
                }
            }
        } else {
            this.valid = false;
        }
        if (this.valid && this.validName) {
            document.getElementById('sub').setAttribute('disabled', 'false');
        } else {
            document.getElementById('sub').setAttribute('disabled', 'true');
        }
    }
    /**
     * Hinzufügen einer neuen Eigenschaft ohne Bezeichner
     */
    addControl() {
        this.labels.push('');
        document.getElementById('sub').setAttribute('disabled', 'true');
    }
    /**
     * Löschen der angeklickten Eigenschaft
     * @param control
     */
    removeControl(control) {
        for (let i = 0; i < this.labels.length; i++) {
            if (i == control.key) {
                this.labels.splice(i, 1);
            }
        }
        document.getElementById('sub').setAttribute('disabled', 'true');
        this.checkValidate();
    }
    /**
     * zur eindeutigen Identifizierung der Labels
     * @param index
     * @param obj
     */
    customTrackBy(index: number, obj: any): any {
        return index;
    }
}
