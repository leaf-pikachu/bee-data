import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//region Plugins Module import start
//endregion Plugins Module import end

//region BeeFramework start
//module import

//directive import

//component import
import { ValidateErrorMsgModule } from '@bee/form/validate-error-msg/validate-error-msg.module';
import { GroupInputComponent } from '@bee/form/input/group-input/group-input.component';
import { InputComponent } from '@bee/form/input/input.component';

//endregion BeeFramework end





@NgModule({
  declarations: [
    GroupInputComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidateErrorMsgModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    GroupInputComponent,
    InputComponent,
  ]
})
export class InputModule { }
