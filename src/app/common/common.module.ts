import { NgModule } from '@angular/core';
import {NetworkListenerDirective} from '../directives/network-listener.directive';

@NgModule({
  declarations: [NetworkListenerDirective],
  exports: [
    NetworkListenerDirective
  ]
})

/**
 * This module provides directives which are needed by all or several of the other modules.
 * For now, it only declares and exports the NetworkListenerDirective.
 * By importing CommonModule, your module gets access to that directive.
 */
export class CommonModule { }
