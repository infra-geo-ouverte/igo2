import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';

import { Subscription } from 'rxjs';

import { Entity } from '../../entity/shared/entity.interface';
import { Widget } from '../../widget/shared/widget.interface';
import { Editor } from '../shared/editor';

@Component({
  selector: 'fadq-editor-outlet',
  templateUrl: './editor-outlet.component.html',
  styleUrls: ['./editor-outlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorOutletComponent implements OnDestroy {

  public component: any;
  public componentData: Object;

  private entity$$: Subscription;
  private widget$$: Subscription;

  @Input()
  get editor(): Editor {
    return this._editor;
  }
  set editor(value: Editor) {
    this._editor = value;
    this.bindEditor();
  }
  private _editor;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnDestroy() {
    this.unbindEditor();
  }

  private bindEditor() {
    this.entity$$ = this.editor.entity$
      .subscribe((entity: Entity) => this.handleEntityChange(entity));
    this.widget$$ = this.editor.widget$
      .subscribe((widget: Widget) => this.handleWidgetChange(widget));
  }

  private unbindEditor() {
    if (this.entity$$ !== undefined) {
      this.entity$$.unsubscribe();
    }
    if (this.widget$$ !== undefined) {
      this.widget$$.unsubscribe();
    }
  }

  private handleEntityChange(entity: Entity) {
    this.componentData = this.editor.getComponentData();
    this.cdRef.detectChanges();
  }

  private handleWidgetChange(widget: Widget) {
    this.component = widget === undefined ? undefined : widget.component;
    this.componentData = this.editor.getComponentData();
    this.cdRef.detectChanges();
  }

}
