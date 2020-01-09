import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { ChecklistItem } from '../model/checklist-item.model';
import { Checklist } from '../model/checklist.model';
import { invalid } from '@angular/compiler/src/render3/view/util';


@Component({
  selector: 'app-object-manager-control-new',
  templateUrl: './object-manager-control-new.page.html',
  styleUrls: ['./object-manager-control-new.page.scss'],
  
})
export class ObjectManagerControlNewPage implements OnInit {
  public myForm: FormGroup;
  private PropertiesCount: number = 0  ;
  label = [];
  name: string;
  text: string = "";
  valid:boolean = false;

  

  constructor(private formBuilder: FormBuilder,  private router: Router){
    this.myForm = formBuilder.group({
      Propertie0: []
    });
  }
  
  ngOnInit() {}
  ngAfterViewInit(){
    this.checkValidate();
  }
  setValue(s: string, name){
    let x = document.getElementsByTagName("ion-input");
    for(let i = 0; i<x.length;i++){
      if(x[i].name == name){
        x[i].setAttribute("value",s);
        break;
      }
    }
    this.checkValidate();
  }
  submit(){
    let checklist = new Checklist();
    let x = document.getElementsByTagName("ion-input");
    this.name = x[0].getAttribute("value");
    console.log(x.length)
    for(let i = 1; i<x.length;i++){
        this.label.push(x[i].value);
    } 
    checklist.name = this.name;
    checklist.items = [];
    console.log(this.label,this.label.length)
    for(let i = 0; i<this.label.length;i++){
      let item: ChecklistItem = {name: this.label[i], description: "", images: [], isOk:false};
      checklist.items.push(item);
    }
    let navigationExtras: NavigationExtras = {
      queryParams: {
       checklist: JSON.stringify(checklist)
      }
    };
    this.router.navigate(['/tabs/object-manager-control-view'], navigationExtras);
  
  }
  checkValidate(){
    let input = document.getElementsByTagName("ion-input");
    console.log(input);
    for(let i = 0;i<input.length;i++){
      if(input[i].value!=""){
        this.valid=true;
      }
      else{
        this.valid=false;
        break;
      }
    }
    if(this.valid){
      document.getElementsByTagName("ion-button")[1].setAttribute("disabled","false");
    }
    else{
      document.getElementsByTagName("ion-button")[1].setAttribute("disabled","true");
    }
  }
  addControl(){
    this.PropertiesCount++;
    this.myForm.addControl('Propertie' + this.PropertiesCount, new FormControl());
    document.getElementsByTagName("ion-button")[1].setAttribute("disabled","true");
  }
  removeControl(control){
    this.myForm.removeControl(control.key);
    document.getElementsByTagName("ion-button")[1].setAttribute("disabled","true");
    console.log(document.getElementsByTagName("ion-button")[1].getAttribute("disabled"));
  }
}