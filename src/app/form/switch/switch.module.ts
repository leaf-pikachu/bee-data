import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//region Plugins Module import start
//endregion Plugins Module import end

//region BeeFramework start
//module import
import {ValidateErrorMsgModule} from '@bee/form/validate-error-msg/validate-error-msg.module';

//directive import

//pipe import
import { SwitchIconPipe } from '@bee/form/switch/switch-icon/switch-icon.pipe';


//component import
import { SwitchIconComponent } from '@bee/form/switch/switch-icon/switch-icon.component';

//endregion BeeFramework end


@NgModule({
  declarations: [
    SwitchIconComponent,
    SwitchIconPipe
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidateErrorMsgModule
  ],
  exports: [
    SwitchIconComponent,
    SwitchIconPipe
  ]
})
export class SwitchModule { }
