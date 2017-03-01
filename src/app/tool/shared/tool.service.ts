import { Injectable } from '@angular/core';

import { Tool } from './tool.interface';
import { ToolComponent } from './tool-component';

export function Register() {
  return function(cls) {
    ToolService.register(cls);
  };
}

@Injectable()
export class ToolService {

  static toolClasses: Array<typeof ToolComponent> = [];
  static tools: Array<Tool> = [];

  static register(cls: any) {
    const tool = {
      name: cls.name_,
      title: cls.title,
      icon: cls.icon
    };

    if (cls.toolbar !== undefined) {
      tool['toolbar'] = cls.toolbar;
    }

    ToolService.tools.push(tool);
    ToolService.toolClasses.push(cls);
  }

  constructor() {}

  getTool(name: string) {
    return ToolService.tools.find(t => t.name === name);
  }

  getToolClass(name: string) {
    return ToolService.toolClasses.find(t => t.name_ === name);
  }
}
