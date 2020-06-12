﻿/**
 @name: layui-o.colorpicker 颜色选择器 TypeScript 类型定义.
 @author: 巽翎君.
 */

declare namespace Layui {
    /** layui-o.colorpicker 组件的接口声明. */
    export interface IColorPickerStatic extends IModuleBase {
        /** 渲染颜色选择器. */
        render(options: Object): IColorPickerInstance;
    }
    /** layui-o.colorpicker 实例声明. */
    export interface IColorPickerInstance {
        config: any;
    }
}
