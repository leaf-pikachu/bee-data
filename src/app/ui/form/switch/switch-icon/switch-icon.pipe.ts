import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'switchIcon'
})
export class SwitchIconPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let info: {color: string; text: string} = {color: 'warning', text: '否'};

    if (value && value === 't')
      info = {color: 'success', text: '是'};

    return `<span class="badge badge-${info.color} font-weight-bold">${info.text}</span>`;
  }

}
