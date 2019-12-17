import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';


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
  

  constructor(private formBuilder: FormBuilder,  private router: Router){

    this.myForm = formBuilder.group({
      Propertie0: []
    });

  }
  
  ngOnInit() {}
  setValue(s: string, name){
    var x = document.getElementsByTagName("ion-input");
    for(var i = 0; i<x.length;i++){
      if(x[i].name == name){
        x[i].setAttribute("value",s);
        break;
      }
    }
  }
  submit(){
    var x = document.getElementsByTagName("ion-input"); 
    this.name = x[0].getAttribute("value");
    for(var i = 1; i<x.length;i++){
        this.label.push(x[i].value);
    }
    let navigationExtras: NavigationExtras = {
      queryParams: {
       labels: this.label,
       name: this.name
      }
    };
    this.router.navigate(['/tabs/object-manager-control-view'], navigationExtras);
  }

  addControl(){
    this.PropertiesCount++;
    this.myForm.addControl('Propertie' + this.PropertiesCount, new FormControl());
  }
  removeControl(control){
    this.myForm.removeControl(control.key);
  }
}