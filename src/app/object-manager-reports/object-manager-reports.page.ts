import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-object-manager-reports',
  templateUrl: './object-manager-reports.page.html',
  styleUrls: ['./object-manager-reports.page.scss'],
})
export class ObjectManagerReportsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navToControlManagerNewPage() {
    this.router.navigateByUrl('/tabs/object-manager-new');
  }
}
