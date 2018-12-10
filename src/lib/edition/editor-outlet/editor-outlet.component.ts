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

import { Entity } from 'src/lib/entity';
import { Widget } from 'src/lib/widget';
import { Editor } from 'src/lib/edition';

@Component({
  selector: 'fadq-editor-outlet',
  templateUrl: './editor-outlet.component.html',
  styleUrls: ['./editor-outlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorOutletComponent implements OnDestroy {

  public component: any;
  public componentData: { [key: string]: any };
  public subscribers: { [key: string]: (event: any) => void };

  private entity$$: Subscription;
  private activeWidget$$: Subscription;

  @Input()
  get editor(): Editor {
    return this._editor;
  }
  set editor(value: Editor) {
    this._editor = value;
    this.bindEditor();
  }
  private _editor;

  @Output() initComponent = new EventEmitter();
  @Output() destroyComponent = new EventEmitter();

  get componentData$(): { [key: string]: any } {
    return this.editor.widgetData$;
  }

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnDestroy() {
    this.unbindEditor();
  }

  private bindEditor() {
    this.unbindEditor();

    if (this.editor === undefined) {
      return;
    }

    this.activeWidget$$ = this.editor.activeWidget$
      .subscribe((widget: Widget) => this.onWidgetChange(widget));
  }

  private unbindEditor() {
    if (this.entity$$ !== undefined) {
      this.entity$$.unsubscribe();
    }
    if (this.activeWidget$$ !== undefined) {
      this.activeWidget$$.unsubscribe();
    }
  }

  private onWidgetChange(widget: Widget) {
    if (widget !== undefined) {
      this.initWidgetComponent(widget);
    } else {
      this.destroyWidgetComponent();
    }
  }

  private initWidgetComponent(widget: Widget) {
    this.component = widget.component;
    this.subscribers = this.computeWidgetSubscribers(widget);

    if (this.component !== undefined) {
      this.initComponent.emit();
    }

    this.cdRef.detectChanges();
  }

  private destroyWidgetComponent() {
    this.component = undefined;
    this.subscribers = undefined;
    this.cdRef.detectChanges();
    this.destroyComponent.emit();
  }

  private computeWidgetSubscribers(widget: Widget) {
    return {
      complete: () => { this.editor.deactivateWidget(); },
      cancel: () => { this.editor.deactivateWidget(); }
    };
  }

}
