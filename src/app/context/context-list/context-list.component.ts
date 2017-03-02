import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { IgoStore } from '../../store/store';

import { Tool } from '../../tool/shared/tool.interface';
import { ToolComponent } from '../../tool/shared/tool-component';
import { Register } from '../../tool/shared/tool.service';
import { Context } from '../shared/context.interface';
import { ContextService } from '../shared/context.service';


@Register()
@Component({
  selector: 'igo-context-list',
  templateUrl: './context-list.component.html',
  styleUrls: ['./context-list.component.styl']
})
export class ContextListComponent implements ToolComponent, OnInit {

  static name_: string = 'context';
  static title: string = 'Contexts';
  static icon: string = 'bookmark';
  static defaultOptions: any = {};

  contexts: Observable<Context[]>;
  selectedContext?: Context;

  get edition (): boolean {
    return this.editTool !== undefined;
  }

  private editTool: Tool;

  constructor(private contextService: ContextService,
              private store: Store<IgoStore>) { }

  ngOnInit() {
    this.store
      .select(s => s.tools)
      .subscribe((tools: Tool[]) => {
          this.editTool = tools.find(t => t.name === 'contextEditor');
       });

    this.store
      .select(s => s.activeContext)
      .subscribe((context: Context) => {
        this.selectedContext = context;
      });

    this.contexts = this.contextService.getContexts();
  }

  selectContext(context: Context) {
    if (context.name !== this.selectedContext.name) {
      this.contextService.loadContext(context.name);
    }
  }

  editContext(context: Context) {
    if (this.editTool !== undefined) {
      this.store.dispatch({type: 'EDIT_CONTEXT', payload: context});
      this.store.dispatch({type: 'SELECT_TOOL', payload: this.editTool});
    }
  }
}
