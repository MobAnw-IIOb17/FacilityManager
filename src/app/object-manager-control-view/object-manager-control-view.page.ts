import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Checklist } from '../model/checklist.model';
import { GalleryService } from '../services/gallery.service';

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
  valid = false;
  public pictures: string[] = [];

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private galleryService_01: GalleryService) {
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
  ngAfterViewInit(){
    this.checkValidation();
    this.galleryService_01.selectGallery(document.getElementById('gallery-grid_01'));
  }
  setValue(s: string, name){
    let x = document.getElementsByTagName("ion-textarea");
    for(let i = 0; i<x.length;i++){
      if(x[i].name == name){
        this.labels[i].description=s;
      }
    }
    this.checkValidation();
  }
  checkCheckbox(item, checkbox){
    let x = document.getElementsByTagName("ion-textarea");
    if(checkbox.checked){
      for(let i = 0; i<this.labels.length; i++){
        if(item.name == this.labels[i].name){
          this.labels[i].isOk=true;
        }
      }
    }
    else{
      for(let i = 0; i<this.labels.length; i++){
        if(item.name == this.labels[i].name){
          this.labels[i].isOk=false;
        }
      }
    }
    this.checkValidation();
  }
  checkValidation(){
    let text = document.getElementsByTagName("ion-textarea");
    let check = document.getElementsByTagName("ion-checkbox");
    let btn = document.getElementsByClassName("generate_button");
    for(let i = 0;i<text.length;i++){
      if(check[i].checked==false&&text[i].value!=""||check[i].checked==true){
        this.valid=true;
      }
      else{
        if(check[i].checked==false){
          this.valid=false;
          break;
        }
      }
    }
    if(this.valid){
      btn[0].setAttribute("disabled","false");
    }
    else{
      btn[0].setAttribute("disabled","true");
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

}
