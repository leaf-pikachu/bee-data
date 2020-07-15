import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, NgForm} from '@angular/forms';
import {BeeFormTools} from '@bee/core/config/validator/bee-form-tools';
import {ElementState, elementStateSegment} from '@bee/ui/form/bee-form-element';

@Component({
  selector: 'bee-input',
  templateUrl: './input.component.html',
  styles: []
})
export class InputComponent implements OnInit {
  /**
   * NgForm instance
   */
  @Input() beeForm: NgForm;

  @Input() elementState: ElementState;

  /**
   * Bee Reactive FormControl instance
   */
  beeRFC: FormControl;

  isRequired: boolean;
  inputType: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.beeRFC = elementStateSegment(this.formBuilder, this.elementState);
    this.isRequired = BeeFormTools.checkRequired(this.beeRFC);
  }
}
