import { NgModule } from '@angular/core';
import {NetworkListenerDirective} from '../directives/network-listener.directive';



@NgModule({
  declarations: [NetworkListenerDirective],
  exports: [
    NetworkListenerDirective
  ]
})
export class CommonModule { }
