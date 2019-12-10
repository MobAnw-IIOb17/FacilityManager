import {Directive, HostListener} from '@angular/core';
import { NetworkService } from '../services/network.service';

/**
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

    constructor( networkService: NetworkService ) {
        this.networkService = networkService;
    }

    private networkService;

    @HostListener('document:online')
    onOnline() {
        // alert('i am online'); // for debugging purposes
        this.networkService.onOnline(); // TODO: find out why this gets triggered thrice
    }
}
