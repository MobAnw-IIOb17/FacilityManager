import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-object-manager-control-view',
  templateUrl: './object-manager-control-view.page.html',
  styleUrls: ['./object-manager-control-view.page.scss'],
})
export class ObjectManagerControlViewPage implements OnInit {

  data:String;
  private myFormNew: FormGroup;
  labels = [];

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      console.log(params.name+" "+params.labels);
      if (params) {
        if(params.name){
          this.data = params.name;
        }
        if(params.labels){
          this.labels = params.labels;

        }
      }
      if(params && params.special){
        this.data = params.special;
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
