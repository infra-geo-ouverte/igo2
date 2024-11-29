import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output
} from '@angular/core';

import { BackdropComponent } from '@igo2/common/backdrop';

import { ExpansionPanelHeaderComponent } from './expansion-panel-header.component';
import { showContent } from './expansion-panel.animations';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss'],
  animations: [showContent()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [BackdropComponent, ExpansionPanelHeaderComponent]
})
export class ExpansionPanelComponent {
  @Input()
  get expanded(): boolean {
    return this._expanded;
  }
  set expanded(value: boolean) {
    if (value === this._expanded) {
      return;
    }

    this._expanded = value;
    this.expandedChange.emit(this._expanded);
  }
  private _expanded: boolean;

  @Input() maximized = false;

  @Input()
  get backdropShown(): boolean {
    return this._backdropShown;
  }
  set backdropShown(value: boolean) {
    this._backdropShown = value;
  }
  private _backdropShown: boolean;

  @Output() expandedChange = new EventEmitter<boolean>();

  @HostBinding('class.app-expansion-panel-expanded')
  get hasExpandedClass() {
    return this.expanded;
  }

  @HostBinding('class.app-expansion-panel-expanded-maximized')
  get hasExpandedFullClass() {
    return this.expanded && this.maximized;
  }

  onBackdropClick() {
    this.expanded = false;
    this.backdropShown = false;
  }
}
