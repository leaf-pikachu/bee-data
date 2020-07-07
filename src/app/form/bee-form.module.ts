import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidateErrorMsgModule } from '@bee/form/validate-error-msg/validate-error-msg.module';
import { ValidationModule } from '@bee/form/validation/validation.module';
import { InputModule } from '@bee/form/input/input.module';
import { SelectModule } from '@bee/form/select/select.module';
import { SwitchModule } from '@bee/form/switch/switch.module';
import { TreeModule } from '@bee/form/tree/tree.module';
import { TextareaModule } from '@bee/form/textarea/textarea.module';
import { AutoConfigComponent } from './auto-config/auto-config.component';

@NgModule({
  declarations: [AutoConfigComponent],
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
    AutoConfigComponent,
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
