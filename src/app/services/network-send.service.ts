import { Injectable } from '@angular/core';

import {Network} from '@ionic-native/network';
import {HttpClient} from '@angular/common/http';
import {DamageService} from './damage.service';
import {EmployeeService} from './employee.service';
import {PropertyService} from './property.service';
import {ObjectChecklistService} from './object-checklist.service';

@Injectable({
  providedIn: 'root'
})

/**
 * This services can be used to inquire whether there is a network connection
 * and it provides functionality to initiate all routines which can be executed as soon as there's online access.
 */
export class NetworkSendService {

    /**
     * The constructor adds all needed services.
     * @param http the HttpClient which right now is only needed for testing posting to the webservice
     * @param damageService the DamageService the NetworkService connects to for initiating the sending of pending damages
     * @param objectChecklistService the objectChecklistService to send pending object checklists
     * @param employeeService the EmployeeService the NetworkService connects to for initiating database syncing
     * @param propertyService the propertyService to update properties
     */
  constructor(private http: HttpClient,
              private damageService: DamageService,
              private objectChecklistService: ObjectChecklistService,
              private employeeService: EmployeeService,
              private propertyService: PropertyService) { }

    /**
     * This method is triggered by the NetworkListenerDirective as soon as the online event is fired.
     * It sends pending damage reports and syncs the wrapper databases.
     */
  onOnline() {
      this.damageService.sendPendingDamages();
      this.objectChecklistService.sendPendingChecklists();
      this.employeeService.updateEmployees();
      this.propertyService.updateProperties();
  }

  test() {
    alert('i am online, whohooo');
  }

  /**
   * Call this method when user is initiating a manual sync in the app.
   * Updates employees and properties and sends pending damage reports and pending checklists.
   */
  sync() {
    this.onOnline();
  }

    /**
     * This is only a debugging/testing method to test the posting of data to the damage webservice.
     * It should be removed as soon as it works.
     */
    private testPost() {
        this.http.post('http://dev.inform-objektservice.de/hmdinterface/rest/damage/',
          '{"pid": "0", "crdate": "1576567520", "tstamp": "1576567520", "hidden": "0", ' +
          '"archived": "0", "sent_on": "0", "cruser_id": "0", "description": "Alles ist kaputt! TEST TEST", ' +
          '"deleted": "0", "object_uid": "110", "employee_uid": "0", "phone": "", "tenant": "", "location": "", ' +
          '"date": "0", "images": "", "seen": "0" }')
          .subscribe(data => {
            alert(JSON.stringify(data));
          }, error => {
            alert(error);
          });
    }
}
