import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs';

import { Widget } from 'src/lib/widget';
import { Editor } from 'src/lib/edition';

@Component({
  selector: 'fadq-editor-outlet',
  templateUrl: './editor-outlet.component.html',
  styleUrls: ['./editor-outlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorOutletComponent {

  @Input()
  get editor(): Editor { return this._editor; }
  set editor(value: Editor) { this._editor = value; }
  private _editor;

  @Output() deactivateWidget = new EventEmitter<Widget>();

  get widget$(): Observable<Widget> {
    return this.editor.widget$;
  }

  get widgetInputs$(): Observable<{ [key: string]: any }> {
    return this.editor.widgetInputs$;
  }

  constructor() {}

  onWidgetCancel(widget: Widget) {
    this.editor.deactivateWidget();
    this.deactivateWidget.emit(widget);
  }

  onWidgetComplete(widget: Widget) {
    this.editor.deactivateWidget();
    this.deactivateWidget.emit(widget);
  }

}
