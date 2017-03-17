import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { IgoStore } from '../../store/store';

import { Observer } from '../../utils/observer';
import { FlexibleState } from '../../shared/flexible';
import { Media, MediaService } from '../../core/media.service';
import { Tool } from '../../tool/shared/tool.interface';
import { SearchResult } from '../../search/shared/search-result.interface';
import { ContextService } from '../../context/shared/context.service';

import { toolbarSlideInOut, toolSlideInOut} from './navigator.animation';


@Component({
  selector: 'igo-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.styl'],
  animations: [
    toolbarSlideInOut,
    toolSlideInOut
  ]
})
export class NavigatorComponent
  extends Observer implements OnInit {

  focusedResult: SearchResult;
  media: Media;
  menuState: FlexibleState = 'initial';
  toastState: FlexibleState = 'collapsed';
  sidenavOpened: boolean = false;
  selectedTool: Tool;

  get toolbarState () {
    return this.selectedTool ? 'out' : 'in';
  }

  get toolState () {
    return this.selectedTool ? 'in' : 'out';
  }

  constructor(private store: Store<IgoStore>,
              private mediaService: MediaService,
              private contextService: ContextService,
              private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.route.queryParams
        .subscribe(params => {
          this.contextService.loadContext(params['context']);
        }));

    this.subscriptions.push(
      this.mediaService.media
        .subscribe((media: Media) => this.media = media));

    this.subscriptions.push(
      this.store.select(s => s.toolHistory)
        .subscribe((toolHistory: Tool[]) => {
          this.handleToolHistoryChanged(toolHistory);
        }));

    this.subscriptions.push(
      this.store.select(s => s.focusedResult)
        .subscribe((result: SearchResult) => this.focusedResult = result));

    this.subscriptions.push(
      this.store.select(s => s.selectedResult)
        .subscribe((result: SearchResult) => {
            if (result && this.media === 'mobile') {
              this.closeSidenav();
            }
        }));
  }

  goBack() {
    this.store.dispatch({type: 'SELECT_PREVIOUS_TOOL'});
  }

  goHome() {
    this.store.dispatch({type: 'UNSELECT_TOOL'});
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
    this.menuState = this.menuState === 'initial' ? 'expanded' : 'initial';
  }

  toggleToast() {
    this.toastState = this.toastState === 'initial' ? 'expanded' : 'initial';
  }

  private handleToolHistoryChanged(toolHistory?: Tool[]) {
    this.selectedTool = toolHistory[toolHistory.length - 1];
    this.menuState = 'initial';
  }
}
