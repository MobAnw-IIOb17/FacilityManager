import {Directive, HostListener} from '@angular/core';
import { NetworkSendService } from '../services/network-send.service';

@Directive({
  selector: '[appNetworkListener]'
})

/**
 * This directive provides a network listener which should be included in each part of the app's gui.
 *
 * To use this directive in your module you need to:
 * 1. include appNetworkListener in your html page like this:
 * `<ion-content appNetworkListener>`
 * 2. add `CommonModule` to the imports in your module.ts (if it's not there already)
 */
export class NetworkListenerDirective {

  /**
   * The constructor does nothing more than to include the app's network service.
   */
  constructor( networkService: NetworkSendService ) {
    this.networkService = networkService;
  }

  private networkService: NetworkSendService;

  /**
   * This is the host listener for the online event.
   */
  @HostListener('document:online')

  /**
   * This method gets triggered each time the online event is fired.
   * It calls the network service method `onOnline()`
   * which performs all routines that are scheduled for when the app goes online again.
   */
  onOnline() {
    this.networkService.onOnline();
  }
}
