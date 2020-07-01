import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidateErrorMsgModule } from '@bee/form/validate-error-msg/validate-error-msg.module';
import { ValidationModule } from '@bee/form/validation/validation.module';
import { InputModule } from '@bee/form/input/input.module';
import { SelectModule } from '@bee/form/select/select.module';
import { SwitchModule } from '@bee/form/switch/switch.module';
import { TreeModule } from '@bee/form/tree/tree.module';
import { TextareaModule } from '@bee/form/textarea/textarea.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ValidateErrorMsgModule,
    ValidationModule,
    InputModule,
    SelectModule,
    SwitchModule,
    TreeModule,
    TextareaModule
  ],
  exports: [
    ValidateErrorMsgModule,
    ValidationModule,
    InputModule,
    SelectModule,
    SwitchModule,
    TreeModule,
    TextareaModule
  ]
})
export class BeeFormModule { }
