import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-object-manager-control-new',
  templateUrl: './object-manager-control-new.page.html',
  styleUrls: ['./object-manager-control-new.page.scss'],
})
export class ObjectManagerControlNewPage implements OnInit {
  public myForm: FormGroup;
  private LabelCount: number = 0  ;

  constructor(private formBuilder: FormBuilder){

    this.myForm = formBuilder.group({
      Label0: []
    });

  }
  
  ngOnInit() {}

  addControl(){
    this.LabelCount++;
    this.myForm.addControl('Label' + this.LabelCount, new FormControl());
  }
}