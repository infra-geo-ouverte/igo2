import { Injectable } from '@angular/core';

import { Tool } from '../tool/shared/tool.interface';
import { ToolComponent } from '../tool/shared/tool-component.model';

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

    ToolService.tools.push(tool);
    ToolService.toolClasses.push(cls);
  }

  getTool(name: string) {
    return ToolService.tools.find(t => t.name === name);
  }

  getToolClass(name: string) {
    return ToolService.toolClasses.find(t => t.name_ === name);
  }

  constructor() { }

}
