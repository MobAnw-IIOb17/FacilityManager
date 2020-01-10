import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Checklist } from '../model/checklist.model';

@Component({
  selector: 'app-object-manager-control-view',
  templateUrl: './object-manager-control-view.page.html',
  styleUrls: ['./object-manager-control-view.page.scss'],
})
export class ObjectManagerControlViewPage implements OnInit {

  name: string;
  private myFormNew: FormGroup;
  labels = [];
  checklist= new Checklist();

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if(params && params.checklist){
        this.checklist = JSON.parse(params.checklist);
        this.name = this.checklist.name;
        this.labels = this.checklist.items;
        for(let i = 0; i<this.checklist.items.length;i++){
          this.labels[i].description = this.checklist.items[i].description;   
        }
      }
    })
    this.myFormNew = formBuilder.group({
    });
   } 
  ngOnInit() {
  }
  setValue(s: string, name){
    let x = document.getElementsByTagName("ion-textarea");
    for(let i = 0; i<x.length;i++){
      if(x[i].name == name){
        this.labels[i].description=s;
      }
    }
  }
  checkCheckbox(item, checkbox,o){
    console.log(o);
    let x = document.getElementsByTagName("ion-textarea")
    if(checkbox.checked){
      for(let i = 0; i<this.labels.length; i++){
        if(item.name == this.labels[i].name){
          this.labels[i].isOk=true;
          x[i].parentElement.children[3].setAttribute("required",'false');
        }
      }
    }
    else{
      for(let i = 0; i<this.labels.length; i++){
        if(item.name == this.labels[i].name){
          this.labels[i].isOk=false;
          x[i].parentElement.children[3].setAttribute("required",'true');
        }
      }
    }
  }
  openCamera(){

  }
  openPhotos(){
    
  }
  submit(){
    this.checklist.items=this.labels;
    
    let navigationExtras: NavigationExtras = {
      queryParams: {
       checklist: JSON.stringify(this.checklist)
      }
    };
    this.router.navigate(['/tabs/object-manager-control-list'], navigationExtras);
  }
  print(o){
    console.log(o);
  }
}
