import {Directive, HostListener} from '@angular/core';
import { NetworkService } from '../services/network.service';

/**
 * This directive provides a network listener which should be included in each part of the app's gui.
 *
 * To use this directive in your module you need to:
 * 1. include appNetworkListener in your html page like this:
 * `<ion-content appNetworkListener>`
 * 2. add NetworkListenerDirective to your module's declarations like this:
 * `declarations: [..., NetworkListenerDirective]`
 */
@Directive({
    selector: '[appNetworkListener]'
})

export class NetworkListenerDirective {

    /**
     * The constructor does nothing more than to include the app's network service.
     */
    constructor( networkService: NetworkService ) {
        this.networkService = networkService;
    }

    private networkService: NetworkService;

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
        this.networkService.onOnline(); // TODO: find out why this gets triggered thrice
    }
}
