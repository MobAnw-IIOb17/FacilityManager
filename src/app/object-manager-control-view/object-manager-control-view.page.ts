import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-object-manager-control-view',
  templateUrl: './object-manager-control-view.page.html',
  styleUrls: ['./object-manager-control-view.page.scss'],
})
export class ObjectManagerControlViewPage implements OnInit {

  data:any
  private myFormNew: FormGroup;
  Labels = ['Garten', 'Briefkasten'];

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = params.special;
        console.log(params.special);
        // this.data = JSON.parse(params.special);
      }
    })
    this.myFormNew = formBuilder.group({
    });
   } 
  ngOnInit() {
  }
  checkCheckbox(c){
    console.log(c);
  }
  openCamera(){

  }
  openPhotos(){
    
  }


}
