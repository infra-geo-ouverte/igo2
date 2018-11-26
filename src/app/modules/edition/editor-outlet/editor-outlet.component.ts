import {
  Component,
  Input,
  Output,
  EventEmitter,
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

  @Output() display = new EventEmitter();

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnDestroy() {
    this.unbindEditor();
  }

  private bindEditor() {
    this.unbindEditor();

    if (this.editor === undefined) {
      return;
    }

    this.entity$$ = this.editor.entity$
      .subscribe((entity: Entity) => this.onEntityChanged(entity));
    this.widget$$ = this.editor.widget$
      .subscribe((widget: Widget) => this.onWidgetChanged(widget));
  }

  private unbindEditor() {
    if (this.entity$$ !== undefined) {
      this.entity$$.unsubscribe();
    }
    if (this.widget$$ !== undefined) {
      this.widget$$.unsubscribe();
    }
  }

  private onEntityChanged(entity: Entity) {
    this.componentData = this.editor.getComponentData();
    this.cdRef.detectChanges();
  }

  private onWidgetChanged(widget: Widget) {
    this.component = widget === undefined ? undefined : widget.component;
    this.componentData = this.editor.getComponentData();

    if (this.component !== undefined) {
      this.display.emit();
    }

    this.cdRef.detectChanges();
  }

}
