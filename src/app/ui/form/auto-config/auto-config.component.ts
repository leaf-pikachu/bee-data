import { Component, Input, OnInit } from '@angular/core';
import { BeeFormElement } from '@bee/ui/form/bee-form-element';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'bee-auto-config',
  templateUrl: './auto-config.component.html'
})
export class AutoConfigComponent implements OnInit {
  @Input() elements: BeeFormElement[];
  @Input() beeForm: NgForm;
  @Input() beeFg: FormGroup;

  elementGroup: {[key: number]: BeeFormElement[]} = {};
  formRows = Object.keys;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.elements && this.elements.length > 0) {

      this.elements.forEach(element => {
        let formGroupElements = this.elementGroup[element.groupId];
        let formControl = this.formBuilder.control(element.formState, element.validatorOrOpts, element.asyncValidator);
        this.beeFg.addControl(element.key, formControl);

        element.loadData?.((value: any)=> {
          element.items = value
        });

        if (formGroupElements) {
          formGroupElements.push(element)
        } else {
          this.elementGroup[element.groupId] = [element];
        }
      });
    };


  }

}
