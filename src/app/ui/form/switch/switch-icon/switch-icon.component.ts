import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { isString } from "ts-util-is";
import { ElementState, elementStateSegment } from '@bee/ui/form/bee-form-element';

/**
 *  Value 'f' or 't'
 */
@Component({
  selector: 'bee-switch-icon',
  templateUrl: './switch-icon.component.html',
  styles: []
})
export class SwitchIconComponent implements OnInit {
  @Input() elementState: ElementState;
  /**
   * Bee Reactive FormControl instance
   */
  beeRFC: FormControl;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.beeRFC = elementStateSegment(this.formBuilder, this.elementState);
    this.beeRFC.setValue(this.beeRFC.value === 't' || this.beeRFC.value === true);
    this.beeRFC.valueChanges.subscribe(value => {

      if (isString(value)) {

        if (value.toLocaleString().trim() === 't') {
          this.beeRFC.setValue(true);
        } else {
            this.beeRFC.setValue(false);
        }

      }
    });
  }
}
