import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { IgoStore } from '../../store/store';

import { Tool } from '../../tool/shared/tool.interface';
import { ToolComponent } from '../../tool/shared/tool-component';
import { Register } from '../../tool/shared/tool.service';
import { Context } from '../shared/context.interface';
import { ContextService } from '../shared/context.service';


@Register({
  name: 'context',
  title: 'Contexts',
  icon: 'bookmark'
})
@Component({
  selector: 'igo-context-list',
  templateUrl: './context-list.component.html',
  styleUrls: ['./context-list.component.styl']
})
export class ContextListComponent
  extends ToolComponent implements OnInit {

  public contexts: Observable<Context[]>;
  public selectedContext?: Context;

  private contextEditor: Tool;
  private mapEditor: Tool;

  get edition (): boolean {
    return this.contextEditor !== undefined;
  }

  constructor(private contextService: ContextService,
              private store: Store<IgoStore>) {
    super();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(s => s.tools)
      .subscribe((tools: Tool[]) => this.handleToolsChanged(tools)));

    this.subscriptions.push(
      this.store.select(s => s.activeContext)
      .subscribe((context: Context) => this.handleActiveContextChanged(context)));

    this.contexts = this.contextService.getContexts();
  }

  selectContext(context: Context) {
    if (context.uri !== this.selectedContext.uri) {
      this.contextService.loadContext(context.uri);
    }
  }

  editContext(context: Context) {
    if (this.contextEditor !== undefined) {
      this.store.dispatch({type: 'EDIT_CONTEXT', payload: context});
      this.store.dispatch({type: 'SELECT_TOOL', payload: this.contextEditor});
    }
  }

  private handleToolsChanged(tools: Tool[]) {
    this.contextEditor = tools.find(t => t.name === 'contextEditor');
    this.mapEditor = tools.find(t => t.name === 'mapEditor');
  }

  private handleActiveContextChanged(context: Context) {
    if (this.mapEditor !== undefined &&
        this.selectedContext && this.selectedContext !== context) {
      this.selectedContext = context;
      this.store.dispatch({type: 'SELECT_TOOL', payload: this.mapEditor});
    } else {
      this.selectedContext = context;
    }
  }
}
