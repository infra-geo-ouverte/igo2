import { Component } from '@angular/core';

import { ToolComponent } from '../../tool/shared/tool-component.model';
import { ToolService } from '../../core/tool.service';

@Component({
  selector: 'igo-search-tool',
  templateUrl: './search-tool.component.html',
  styleUrls: ['./search-tool.component.styl']
})
export class SearchToolComponent extends ToolComponent {

  static name_: string = 'search';
  static title: string = 'Search Results';
  static icon: string = 'search';

  constructor () {
    super();
  }

}

ToolService.register(SearchToolComponent);
