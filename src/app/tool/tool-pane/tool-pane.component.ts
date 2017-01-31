import { Component, Input } from '@angular/core';

import { Tool } from '../shared/tool.interface';

@Component({
  selector: 'igo-tool-pane',
  templateUrl: './tool-pane.component.html',
  styleUrls: ['./tool-pane.component.styl']
})
export class ToolPaneComponent {

  @Input() tool: Tool;

  constructor() { }

}
