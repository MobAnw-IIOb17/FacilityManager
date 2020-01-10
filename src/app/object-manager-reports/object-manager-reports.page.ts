import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from '../model/property.model';
import { PopoverController } from '@ionic/angular';
import { ReportsPopovercomponentComponent } from './reports-popovercomponent/reports-popovercomponent.component';
import { ObjectChecklistService } from '../services/object-checklist.service';
import { ObjectChecklist } from '../model/object-checklist.model';

@Component({
  selector: 'app-object-manager-reports',
  templateUrl: './object-manager-reports.page.html',
  styleUrls: ['./object-manager-reports.page.scss'],
})
export class ObjectManagerReportsPage implements OnInit {

  objectItems: Array<Property> = []
  dataReturned:any
  objectChecklists: ObjectChecklist[] = [];
  objectChecklist: ObjectChecklist;

  constructor(private router: Router, private popoverController:PopoverController, private objectChecklistService:ObjectChecklistService) { }

  ngOnInit() {
    this.objectItems.push({
      uid: "1",
      deleted: "1",
      hidden: "0",
      title: "",
      street: "Obere Dorf 23",
      zip: "02708",
      city: "Löbau",
      owner: "Hans"
    });
    
    this.objectItems.push({
      uid: "2",
      deleted: "0",
      hidden: "0",
      title: "",
      street: "Unter Dorf 2",
      zip: "48302",
      city: "Görlitz",
      owner: "Peter"
    });
    
    this.objectItems.push({
      uid: "3",
      deleted: "0",
      hidden: "0",
      title: "",
      street: "Obere Schiller 6",
      zip: "57493",
      city: "Bautzen",
      owner: "Achim"
    });
  }

  /**
   * Route zur Nächsten Seite um eine Kontrolle zu erstellen
   */
  navToControlManagerNewPage() {
    this.router.navigateByUrl('/tabs/object-manager-new');
  }

  /**
   * Beim Zeihen nach unten werden alle Elemente aktualisert
   * 
   * @param event Event 
   */
  doRefresh(event) {
    console.log('Begin async operation');

    //Hier Daten Aktualieren
    this.Data1();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 800);
  }

  /**
   * Öffnet ein PopOver oben Rechts mit einem Menu für die Auswahl
   *  - Aktualisieren
   *  - Sortieren nach Stadt, Datum, Status
   * 
   * unter onDidDismiss() wird die Rückgabe des popover verarbeitet
   */
  async openPopover() {
    const popover = await this.popoverController.create({
      component: ReportsPopovercomponentComponent,
      event
    });

    popover.onDidDismiss().then((dataReturned) => {
      if(dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        if(dataReturned.data === "refresh") {
          //this.Data1();

          this.objectChecklistService.getAllChecklists().then((items) => {
            console.log("items.length: " + items.length);
            if(items.length !== 0) {
              console.log(items);
            }
          });

        

        }
        if(dataReturned.data === "city") {
          this.objectItems.sort((a, b) => (a.city > b.city) ? 1 : -1)
        }
        if(dataReturned.data === "date") {
        }
        if(dataReturned.data === "status") {
          this.objectItems.sort((a, b) => (a.deleted > b.deleted) ? 1 : -1)
        }
        console.log("Return: " + this.dataReturned)
      }
    })

    return await popover.present();
  }

  Data1() {
    this.objectItems.pop();
    this.objectItems.pop();
    this.objectItems.pop();   
    
    this.objectItems.push({
      uid: "1",
      deleted: "1",
      hidden: "0",
      title: "",
      street: "Obere Dorf ",
      zip: "02708",
      city: "Löbau",
      owner: "Hans"
    });
    
    this.objectItems.push({
      uid: "2",
      deleted: "1",
      hidden: "0",
      title: "",
      street: "Unter Dorf",
      zip: "48302",
      city: "Görlitz",
      owner: "Peter"
    });
    
    this.objectItems.push({
      uid: "3",
      deleted: "1",
      hidden: "0",
      title: "",
      street: "Obere Schiller",
      zip: "57493",
      city: "Bautzen",
      owner: "Achim"
    });
  }
}
