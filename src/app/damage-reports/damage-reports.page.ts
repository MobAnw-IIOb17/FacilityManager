import {Component, OnInit} from '@angular/core';
import {DamageService} from '../services/damage.service';
import {Damage} from '../model/damage.model';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {DamageDetailsPage} from '../damage-details/damage-details.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-damage-reports',
  templateUrl: './damage-reports.page.html',
  styleUrls: ['./damage-reports.page.scss'],
  providers:  [ DamageService ]
})
export class DamageReportsPage implements OnInit {
  damages: Damage[] = [];

  constructor(public damageService: DamageService, private router: Router, protected httpClient: HttpClient) { }

ngOnInit() {
  //   const subscription = this.damageService.getDamages().subscribe(damages => {
  //     this.damages = damages;
  //     subscription.unsubscribe();
  //   });
}

  openDmgFromInTab() {
    this.router.navigateByUrl('/tabs/damage-details');
  }
  // openDamageById1(id: string) {
  //   this.nav.navigateForward('/tabs/damage-details', {id: id});
  // }


  // public getDamagesById(id: string): Observable<Damage> {
  //   return this.httpClient.get<Damage>(`../assets/damage-list.json/${id}`).pipe(
  //       map(data => new Damage().deserialize(data)),
  //       catchError(() => throwError('User not found'))
  //   );
  // }
}
