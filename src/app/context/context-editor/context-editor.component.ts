import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { IgoStore } from '../../store/store';

import { ToolComponent } from '../../tool/shared/tool-component';
import { Register } from '../../tool/shared/tool.service';
import { Context } from '../shared/context.interface';
import { ContextService } from '../shared/context.service';


@Register({
  name: 'contextEditor',
  title: 'Edit Context',
  icon: 'bookmark'
})
@Component({
  selector: 'igo-context-editor',
  templateUrl: './context-editor.component.html',
  styleUrls: ['./context-editor.component.styl']
})
export class ContextEditorComponent
  extends ToolComponent implements OnInit {

  public context?: Context;

  constructor(private store: Store<IgoStore>,
              private contextService: ContextService) {
    super();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(s => s.editedContext)
      .subscribe((context: Context) => this.context = context));
  }

  updateContext() {
    console.log(this.contextService);
  }

}
