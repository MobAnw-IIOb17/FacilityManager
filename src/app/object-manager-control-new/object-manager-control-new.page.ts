import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';


@Component({
  selector: 'app-object-manager-control-new',
  templateUrl: './object-manager-control-new.page.html',
  styleUrls: ['./object-manager-control-new.page.scss'],
})
export class ObjectManagerControlNewPage implements OnInit {
  public myForm: FormGroup;
  private PropertiesCount: number = 0  ;

  constructor(private formBuilder: FormBuilder){

    this.myForm = formBuilder.group({
      Propertie0: []
    });

  }
  
  ngOnInit() {}
  submit(){

  }

  addControl(){
    this.PropertiesCount++;
    this.myForm.addControl('Propertie' + this.PropertiesCount, new FormControl());
  }
  removeControl(control){
    this.myForm.removeControl(control.key);
  }
}