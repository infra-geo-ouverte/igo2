import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/distinctUntilChanged';

import { Media } from '../../core/media.service';
import { Tool } from '../../tool/shared/tool.interface';
import { SearchResult } from '../../search/shared/search-result.interface';
import { ContextService } from '../../core/context.service';
import { FlexState } from '../../shared/flex';

import { AppStore } from '../../app.store';

@Component({
  selector: 'igo-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.styl'],
  providers: [
    ContextService
  ]
})
export class NavigatorComponent implements OnInit {

  focusedResult: SearchResult;
  media: Media;
  menuState: FlexState = 'initial';
  selectedTool: Tool;

  constructor(private store: Store<AppStore>,
              private contextService: ContextService) { }

  ngOnInit() {
    this.contextService.loadContext();

    /* Interactions */
    this.store
      .select(s => s.browserMedia)
      .distinctUntilChanged()
      .subscribe((media: Media) => {
        if (this.media === undefined && media === 'mobile') {
          this.menuState = 'expanded';
        }

        this.media = media;
      });

    this.store
      .select(s => s.selectedTool)
      .subscribe((tool: Tool) => {
          this.selectedTool = tool;
          if (this.menuState === 'collapsed') {
            this.resizeMenu();
          }
       });

    this.store
      .select(s => s.focusedResult)
      .subscribe((result: SearchResult) => this.focusedResult = result);

    this.store
      .select(s => s.selectedResult)
      .subscribe((result: SearchResult) => {
          if (result && this.media === 'mobile') {
            this.menuState = 'collapsed';
          }
       });
  }

  unselectTool() {
    this.store.dispatch({ type: 'UNSELECT_TOOL' });
  }

  goBack() {
    this.unselectTool();
  }

  goHome() {
    this.unselectTool();
  }

  resizeMenu() {
    if (this.menuState === 'initial') {
      this.menuState = 'collapsed';
    } else if (this.menuState === 'collapsed') {
      this.menuState = (this.media === 'mobile' ? 'expanded' : 'initial');
    } else if (this.menuState === 'expanded') {
      this.menuState = (this.media === 'mobile' ? 'collapsed' : 'initial');
    }
  }
}
