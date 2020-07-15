import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AutoConfigComponent } from './auto-config/auto-config.component';
import { BasicCommonModule } from '@bee/ui/form/basic-common/basic-common.module';
import { InputModule } from '@bee/ui/form/input/input.module';
import { SelectModule } from '@bee/ui/form/select/select.module';
import { TextareaModule } from '@bee/ui/form/textarea/textarea.module';
import { SwitchModule } from '@bee/ui/form/switch/switch.module';

@NgModule({
  declarations: [ AutoConfigComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BasicCommonModule,
    InputModule,
    SelectModule,
    SwitchModule,
    TextareaModule
  ],
  exports: [
    AutoConfigComponent,
    BasicCommonModule,
    InputModule,
    SelectModule,
    TextareaModule,
    SwitchModule
  ]
})
export class BeeFormModule { }
