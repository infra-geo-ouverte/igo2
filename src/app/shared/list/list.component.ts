import { Component, AfterViewInit, OnDestroy, OnInit,
         QueryList, Input, ContentChildren, HostListener } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { ListItemDirective } from './list-item.directive';

@Component({
  selector: 'igo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.styl']
})
export class ListComponent implements AfterViewInit, OnDestroy, OnInit {

  navigationEnabled: boolean;
  selectedItem: ListItemDirective;
  subscriptions: Subscription[] = [];

  @Input('navigation') navigation: boolean = true;

  @ContentChildren(ListItemDirective) listItems: QueryList<ListItemDirective>;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // It would be nice to be able to unsubscribe to the event
    // completely but until ES7 this won't be possible because
    // document events are not observables
    if (this.navigationEnabled) {
      if (event.keyCode === 38 || event.keyCode === 40) {
        event.preventDefault();
        this.navigate(event.keyCode);
      }
    }
  }

  constructor() { }

  ngOnInit() {
    if (this.navigation) {
      this.enableNavigation();
    }
  }

  ngAfterViewInit() {
    this.listItems.changes.subscribe(items => {
      if (this.navigation) {
        this.enableNavigation();
        this.select(items.first);
      }

      this.unsubscribe();
      items.forEach(item => {
        this.subscriptions.push(
          item.onClick.subscribe(item_ => this.select(item_)));
      }, this);
    });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  unsubscribe() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }

  select(item?: ListItemDirective) {
    this.unselect();

    // We need to make this check because dynamic
    // lists such as in the search tool may fail
    if (item !== undefined) {
      item.select();
      this.selectedItem = item;
    }
  }

  unselect() {
    if (this.selectedItem !== undefined) {
      this.selectedItem.unselect();
    }

    this.selectedItem = undefined;
  }

  selectNext() {
    const index = this.getSelectedIndex();
    const items = this.listItems.toArray();
    if (index !== items.length - 1) {
      this.select(items[index + 1]);
    }
  }

  selectPrevious() {
    const index = this.getSelectedIndex();
    const items = this.listItems.toArray();
    if (index !== 0) {
      this.select(items[index - 1]);
    }
  }

  enableNavigation() {
    this.navigationEnabled = true;
  }

  disableNavigation() {
    this.navigationEnabled = false;
  }

  private getSelectedIndex () {
    return this.listItems.toArray().findIndex(
      item => item === this.selectedItem);
  }

  private navigate(key: number) {
    if (this.selectedItem === undefined) {
      return;
    }

    switch (key) {
      case 38:
        this.selectPrevious();
        break;
      case 40:
        this.selectNext();
        break;
      default:
        break;
    }
  }
}
