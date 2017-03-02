import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { IgoStore } from '../../store/store';

import { ToolComponent } from '../../tool/shared/tool-component';
import { Register } from '../../tool/shared/tool.service';
import { Context } from '../shared/context.interface';
import { ContextService } from '../shared/context.service';

@Register()
@Component({
  selector: 'igo-context-editor',
  templateUrl: './context-editor.component.html',
  styleUrls: ['./context-editor.component.styl']
})
export class ContextEditorComponent implements ToolComponent, OnInit {

  static name_: string = 'contextEditor';
  static title: string = 'Edit Context';
  static icon: string = 'bookmark';
  static defaultOptions: any = {};

  context?: Context;

  constructor(private store: Store<IgoStore>,
              private contextService: ContextService) { }

  ngOnInit() {
    this.store
      .select(s => s.activeContext)
      .subscribe((context: Context) => {
        this.context = context;
      });
  }

  updateContext() {
    console.log(this.contextService);
  }

}
