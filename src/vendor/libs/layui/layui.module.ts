import { ModuleWithProviders } from '@angular/core';
import '@bee/vendor/layui/layui.js';
import { LayuiService } from '@bee/libs/layui/layui.service';

export class LayuiModule {


  static forRoot(): ModuleWithProviders<LayuiModule>{
    layui.config({
      dir: 'assets/vendor/layui/',
      base: 'assets/vendor/layui-soul-table/'
    }).extend({
      soulTable: 'ext/soulTable',
      tableChild: 'ext/tableChild',
      tableMerge: 'ext/tableMerge',
      tableFilter: 'ext/tableFilter',
      excel: 'ext/excel',
    });
    // layui.use('layer');

    layui.define( exports => {
      let mod = {
        ext : () => {
          alert("ext");
        },
        eot : () => {
          alert('eot')
        }
      }
      exports('bee', mod)
    });
    console.info(`layui 根路径：${layui.cache.dir}`)
    return {
      ngModule: LayuiModule,
      providers: [LayuiService]
    };
  }
}
