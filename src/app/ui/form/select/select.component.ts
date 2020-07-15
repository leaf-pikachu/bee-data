import {Component, Input, OnInit, QueryList} from '@angular/core';
import { FormBuilder, FormControl, NgForm } from '@angular/forms';

import { BeeFormTools } from '@bee/core/config/validator/bee-form-tools';
import { ElementState, elementStateSegment } from '@bee/ui/form/bee-form-element';

@Component({
  selector: 'bee-select',
  templateUrl: './select.component.html',
  styleUrls: [ './select.component.scss']
})
export class SelectComponent implements OnInit {
  /**
   * NgForm instance
   */
  @Input() beeForm: NgForm;

  @Input() elementState: ElementState;

  /**
   * Bee Reactive FormControl instance
   */
  formControl: FormControl;

  isRequired: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formControl = elementStateSegment(this.formBuilder, this.elementState);
    this.isRequired = BeeFormTools.checkRequired(this.formControl);
  }

}
