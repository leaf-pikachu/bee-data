import { Component } from '@angular/core';

@Component({
  selector: 'bee-label',
  templateUrl: './label.component.html',
  inputs: ['name', 'required', 'title']
})
export class LabelComponent{
  name: string;
  required: boolean;
  title: string;
}
