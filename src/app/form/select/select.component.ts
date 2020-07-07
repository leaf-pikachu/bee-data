import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NgForm } from '@angular/forms';
import { BeeFormTools } from '@bee/config/validator/bee-form-tools';
import { ElementState, elementStateSegment } from '@bee/form/bee-form-element';

@Component({
  selector: 'bee-select',
  templateUrl: './select.component.html',
  styleUrls: [
    '../../../vendor/libs/ng-select/ng-select.scss'
  ]
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
  beeRFC: FormControl;

  isRequired: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.beeRFC = elementStateSegment(this.formBuilder, this.elementState);
    this.isRequired = BeeFormTools.checkRequired(this.beeRFC);
  }

}
