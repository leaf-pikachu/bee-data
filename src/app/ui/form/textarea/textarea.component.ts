import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NgForm } from '@angular/forms';
import { BeeRequired} from '@bee/core/config/validator/bee-required';
import { BeeFormTools } from '@bee/core/config/validator/bee-form-tools';
import { ElementState, elementStateSegment } from '@bee/ui/form/bee-form-element';

@Component({
  selector: 'bee-textarea',
  templateUrl: './textarea.component.html',
  styles: []
})
export class TextareaComponent implements OnInit {
  /**
   * NgForm instance
   */
  @Input() beeForm: NgForm;
  @Input() elementState: ElementState;
  beeRFC: FormControl;
  @Input() rows: string;
  isRequired: boolean;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeProperties();
  }

  protected initializeProperties(): void {
    this.beeRFC = elementStateSegment(this.formBuilder, this.elementState);

    this.isRequired = false;
    this.rows = this.rows || '3';
    this.isRequired = BeeFormTools.checkRequired(this.beeRFC);
  }
}
