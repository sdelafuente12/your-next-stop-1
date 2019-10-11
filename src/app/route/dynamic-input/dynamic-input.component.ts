import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss']
})
export class DynamicInputComponent implements OnInit {
  waypointGroup: FormGroup;

  waypointArray: FormArray;


  constructor(private _formBuilder: FormBuilder) {
    
   }


  ngOnInit() {
    this.waypointGroup = this._formBuilder.group({
      waypoints: this._formBuilder.array([this.createInput()])
    });
    // this.waypointArray = this._formBuilder.array([this.createInput()])
    this.waypointArray = this.waypointGroup.get('waypoints') as FormArray;
  }

  sendText(index) {
    
    console.log(this.waypointArray)
  }

  createInput(): FormGroup {
    return this._formBuilder.group({
      waypoint: ['']
    })
  }

  addInput(): void {
    if (this.waypointArray.length < 10) {
      this.waypointArray.push(this.createInput());
    }
  }

  removeInput(index): void {
    if (this.waypointArray.length > 1) {
      this.waypointArray.removeAt(index);
    }
  }
}
