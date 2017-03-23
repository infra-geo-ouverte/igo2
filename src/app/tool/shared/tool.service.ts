import { Injectable } from '@angular/core';

import { Tool } from './tool.interface';
import { ToolComponent } from './tool-component';

export function Register(toolDef: Tool) {
  return function(cls) {
    ToolService.register(cls, toolDef);
  };
}

@Injectable()
export class ToolService {

  static tools: {[key: string]: [Tool, (typeof ToolComponent)]} = {};

  static register(cls: any, toolDef: Tool) {
    const tool = Object.assign({}, toolDef);

    if (cls.toolbar !== undefined) {
      tool['toolbar'] = cls.toolbar;
    }

    ToolService.tools[tool.name] = [tool, cls];
  }

  constructor() {}

  getTool(name: string) {
    const tool = ToolService.tools[name];

    return tool === undefined ? undefined : tool[0];
  }

  getToolClass(name: string) {
    const tool = ToolService.tools[name];

    return tool === undefined ? undefined : tool[1];
  }
}
