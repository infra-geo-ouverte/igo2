import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface DataSource {
  name: string;
  label: string;
}


@Component({
  selector: 'fadq-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent {

  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  public dataSource: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

  public dataSources: DataSource[] = [
    {name: 'parcels', label: 'Parcelles'},
    {name: 'schemas', label: 'Schemas'}
  ];

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

  @Input()
  get backdropShown(): boolean {
    return this._backdropShown;
  }
  set backdropShown(value: boolean) {
    this._backdropShown = value;
  }
  private _backdropShown: boolean;

  @Output() expandedChange = new EventEmitter<boolean>();

  @HostBinding('class.fadq-expansion-panel-expanded')
  get hasExpandedClass() {
    return this.expanded;
  }

  constructor() {}

}
