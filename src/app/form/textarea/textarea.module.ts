import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//region Plugins Module import start
//endregion Plugins Module import end

//region BeeFramework start
//module import
import { TextareaComponent } from '@bee/form/textarea/textarea.component';
import { ValidateErrorMsgModule } from '@bee/form/validate-error-msg/validate-error-msg.module';

//directive import

//component import
// import { TextareaComponent } from '@bee/shared/form/textarea/textarea.component';

//endregion BeeFramework end

@NgModule({
  declarations: [
    TextareaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidateErrorMsgModule
  ],
  exports: [
    TextareaComponent,
  ]
})
export class TextareaModule { }
