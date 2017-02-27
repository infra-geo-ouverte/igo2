import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppStore } from '../../app.store';

import { ToolClass } from '../../core/tool.service';
import { ToolComponent } from '../../tool/shared/tool-component';
import { Context } from '../shared/context.interface';
import { ContextService } from '../../core/context.service';


@ToolClass()
@Component({
  selector: 'igo-context-tool',
  templateUrl: './context-tool.component.html',
  styleUrls: ['./context-tool.component.styl']
})
export class ContextToolComponent implements ToolComponent, OnInit {

  static name_: string = 'context';
  static title: string = 'Contexts';
  static icon: string = 'bookmark';
  static defaultOptions: any = {};

  contexts: Context[];
  selectedContext?: Context;

  constructor(private contextService: ContextService,
              private store: Store<AppStore>) { }

  ngOnInit() {
    this.store
      .select(s => s.activeContext)
      .subscribe((context: Context) => {
        this.selectedContext = context;
      });

    this.store
      .select(s => s.contexts)
      .subscribe((contexts: Context[]) =>
        this.contexts = contexts);

    this.contextService.getContexts();
  }

  selectContext(context: Context) {
    if (context.name !== this.selectedContext.name) {
      this.contextService.loadContext(context.name);
    }
  }
}
