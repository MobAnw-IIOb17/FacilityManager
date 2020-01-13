import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Checklist } from '../model/checklist.model';
import { GalleryService } from '../services/gallery.service';
import { IonCheckbox, IonTextarea } from '@ionic/angular';

@Component({
  selector: 'app-object-manager-control-view',
  templateUrl: './object-manager-control-view.page.html',
  styleUrls: ['./object-manager-control-view.page.scss'],
})
export class ObjectManagerControlViewPage implements OnInit {

  private name: string;
  private myFormNew: FormGroup;
  private labels = [];
  private checklist= new Checklist();
  private valid = false;
  private pictures: string[] = [];

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
      this.fillLabels();
    })
    this.myFormNew = formBuilder.group({
    });
   } 
  ngOnInit() {
  }
  ngAfterViewInit(){
    this.checkValidation();
    this.fillLabels();
    //this.galleryService_01.selectGallery(document.getElementById('gallery-grid_01'));
  }
  fillLabels(){
    let text = document.getElementsByClassName("descr") as unknown as Array<IonTextarea>;
    let check = document.getElementsByClassName("checkboxes") as unknown as Array<IonCheckbox>;
    console.log("fill",text, this.labels);
    for(let i = 0; i<this.labels.length;i++){
      text[i].value = this.labels[i].description;
      check[i].checked = this.labels[i].isOK;
    }
  }
  setValue(s: string, thislabel){
    thislabel.description=s;
    this.checkValidation();
  }
  checkCheckbox(item, checkbox){
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
    let text = document.getElementsByClassName("descr") as unknown as Array<IonTextarea>;
    let check = document.getElementsByClassName("checkboxes") as unknown as Array<IonCheckbox>;
    let btn = document.getElementById("viewButton");
    for(let i = 0;i<text.length;i++){
      if((check[i].checked==false)&&text[i].value!=""||check[i].checked){
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
      btn.setAttribute("disabled","false");
    }
    else{
      btn.setAttribute("disabled","true");
    }
  }
  openCamera(){

  }
  openPhotos(){
    
  }
  submit(){
    console.log(this.labels);
    this.checklist.items=this.labels;
    console.log(this.checklist);
    let navigationExtras: NavigationExtras = {
      queryParams: {
       checklist: JSON.stringify(this.checklist)
      }
    };
    this.router.navigate(['/tabs/object-manager-control-list'], navigationExtras);
  }

}
