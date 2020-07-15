import { ModuleWithProviders, NgModule } from '@angular/core';
import { LayuiService } from '@bee/libs/layui/layui.service';


@NgModule({
  providers: [],
  declarations: [],
  exports: []
})
export class LayuiModule {
  static forRoot(): ModuleWithProviders<LayuiModule>{

    return {
      ngModule: LayuiModule,
      providers: [LayuiService]
    };
  }
}
