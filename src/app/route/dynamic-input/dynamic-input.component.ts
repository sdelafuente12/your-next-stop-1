import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss']
})
export class DynamicInputComponent implements OnInit {
  waypointForm: FormGroup;

  waypointArray: FormArray;

  constructor(private _formBuilder: FormBuilder) {
    
   }


  ngOnInit() {
    this.waypointForm = new FormGroup({
      city: new FormControl(),
      state: new FormControl()
    });
    // this.waypointForm = this._formBuilder.group({
    //   waypointArray: this._formBuilder.array([this.createInput()])
    // });
  }

  // createInput(): FormGroup {
  //   return this._formBuilder.group({
  //     waypoint: ['', Validators.required]
  //   })
  // }

  // addInput(): void {
  //   this.waypointArray = this.waypointForm.get('waypointArray') as FormArray;
  //   this.waypointArray.push(this.createInput());
  // }
}
