import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-object-manager-control-view',
  templateUrl: './object-manager-control-view.page.html',
  styleUrls: ['./object-manager-control-view.page.scss'],
})
export class ObjectManagerControlViewPage implements OnInit {

  name: string;
  private myFormNew: FormGroup;
  labels = [];

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      if(params && params.checklistItem){
        this.name = JSON.parse(params.checklistItem).name;
        this.labels = JSON.parse(params.checklistItem).items;
      }
    })
    this.myFormNew = formBuilder.group({
    });
   } 
  ngOnInit() {
  }
  checkCheckbox(item, checkbox){
    if(checkbox.checked){
      for(var i = 0; i<this.labels.length; i++){
        if(item.name == this.labels[i].name){
          this.labels[i].isOk=true;
        }
      }
    }
    else{
      for(var i = 0; i<this.labels.length; i++){
        if(item.name == this.labels[i].name){
          this.labels[i].isOk=false;
        }
      }
    }
  }
  openCamera(){

  }
  openPhotos(){
    
  }
  submit(){

  }
}
