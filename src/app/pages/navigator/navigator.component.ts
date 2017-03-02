import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { IgoStore } from '../../store/store';

import { FlexibleState } from '../../shared/flexible';

import { Media, MediaService } from '../../core/media.service';

import { Tool } from '../../tool/shared/tool.interface';

import { SearchResult } from '../../search/shared/search-result.interface';

import { ContextService } from '../../context/shared/context.service';


@Component({
  selector: 'igo-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.styl']
})
export class NavigatorComponent implements OnInit {

  focusedResult: SearchResult;
  media: Media;
  menuState: FlexibleState = 'initial';
  toastState: FlexibleState = 'collapsed';
  sidenavOpened: boolean = false;
  selectedTool: Tool;

  private toolHistory: Tool[] = [];

  constructor(private store: Store<IgoStore>,
              private mediaService: MediaService,
              private contextService: ContextService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.contextService.loadContext(params['context']);
      });

    this.mediaService.media
      .subscribe((media: Media) => this.media = media);

    this.store
      .select(s => s.selectedTool)
      .subscribe((tool: Tool) => {
          this.handleToolSelected(tool);
      });

    this.store
      .select(s => s.focusedResult)
      .subscribe((result: SearchResult) => this.focusedResult = result);

    this.store
      .select(s => s.selectedResult)
      .subscribe((result: SearchResult) => {
          if (result && this.media === 'mobile') {
            this.closeSidenav();
          }
      });
  }

  goBack() {
    const tool = this.toolHistory.pop();
    if (tool !== undefined) {
      this.selectedTool = tool;
      this.selectTool(tool);
    } else {
      this.unselectTool();
    }
  }

  goHome() {
    this.unselectTool();
  }

  closeSidenav() {
    this.sidenavOpened = false;
    this.toastState = 'initial';
  }

  openSidenav() {
    this.sidenavOpened = true;
    this.toastState = 'collapsed';
  }

  toggleSidenav() {
    if (this.sidenavOpened) {
      this.closeSidenav();
    } else {
      this.openSidenav();
    }
  }

  toggleMenu() {
    this.menuState = this.menuState === 'initial' ? 'collapsed' : 'initial';
  }

  toggleToast() {
    this.toastState = this.toastState === 'initial' ? 'expanded' : 'initial';
  }

  private selectTool(tool: Tool) {
    this.store.dispatch({type: 'SELECT_TOOL', payload: tool});
  }

  private unselectTool() {
    this.store.dispatch({type: 'UNSELECT_TOOL'});
  }

  private handleToolSelected(tool?: Tool) {
    if (tool && this.selectedTool && tool.name !== this.selectedTool.name) {
      this.toolHistory.push(this.selectedTool);
    }

    this.selectedTool = tool;
    this.menuState = 'initial';
  }
}
