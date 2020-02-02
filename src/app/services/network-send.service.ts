import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Network} from '@ionic-native/network';
import {LoadingController} from '@ionic/angular';

import {DamageService} from './damage.service';
import {EmployeeService} from './employee.service';
import {PropertyService} from './property.service';
import {ObjectChecklistService} from './object-checklist.service';

@Injectable({
  providedIn: 'root'
})

/**
 * This service provides functionality to initiate all routines which can be executed as soon as there's online access.
 */
export class NetworkSendService {

  /**
   * The constructor adds all needed services.
   *
   * @param http the HttpClient which right now is only needed for testing posting to the webservice
   * @param damageService the DamageService the NetworkService connects to for initiating the sending of pending damages
   * @param objectChecklistService the objectChecklistService to send pending object checklists
   * @param employeeService the EmployeeService the NetworkService connects to for initiating database syncing
   * @param propertyService the propertyService to update properties
   * @param loadingController the loading controller which is needed to display an HTMLIonLoadingElement
   */
  constructor(private http: HttpClient,
              private damageService: DamageService,
              private objectChecklistService: ObjectChecklistService,
              private employeeService: EmployeeService,
              private propertyService: PropertyService,
              private loadingController: LoadingController) {
  }

  /**
   * This method is triggered by the NetworkListenerDirective as soon as the online event is fired.
   */
  onOnline() {
    this.syncData();
  }

  /**
   * Call this method when user is initiating a manual sync in the app.
   * Updates employees and properties and sends pending damage reports and pending checklists.
   */
  sync() {
    if (Network.type !== 'none') {
      this.syncData();
    } else {
      alert('Keine Netzwerkverbindung. Bitte versuchen Sie es später erneut.');
    }
  }

  /**
   * This method sends pending damage reports and checklists and syncs the wrapper databases.
   * As long as it's syncing it shows a loading indicator for the user.
   */
  private async syncData() {
    const loading: HTMLIonLoadingElement = await this.loadingController.create({
      spinner: 'circles',
      message: 'Synchronisiere',
    });
    await loading.present();
    await this.damageService.sendPendingDamages();
    await this.objectChecklistService.sendPendingChecklists();
    await this.employeeService.updateEmployees();
    await this.propertyService.updateProperties();
    await this.objectChecklistService.updateChecklists();
    await loading.dismiss();
  }
}
