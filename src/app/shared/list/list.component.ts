import { Component, AfterViewInit, OnDestroy, OnInit,
         QueryList, Input, ContentChildren, HostListener,
         ElementRef } from '@angular/core';

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
  focusedItem: ListItemDirective;
  subscriptions: Subscription[] = [];

  @Input('navigation') navigation: boolean = true;

  @ContentChildren(ListItemDirective, {descendants: true})
  listItems: QueryList<ListItemDirective>;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // It would be nice to be able to unsubscribe to the event
    // completely but until ES7 this won't be possible because
    // document events are not observables
    if (this.navigationEnabled) {
      if (event.keyCode === 38 || event.keyCode === 40) {
        event.preventDefault();
        this.navigate(event.keyCode);
      } else if (event.keyCode === 13) {
        this.select(this.focusedItem);
      }
    }
  }

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.enableNavigation();
  }

  ngAfterViewInit() {
    if (this.listItems.length) {
      this.init();
    }

    this.listItems.changes.subscribe((items: ListItemDirective[]) => {
      this.init();
    });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  focus(item?: ListItemDirective) {
    this.unfocus();

    // We need to make this check because dynamic
    // lists such as in the search tool may fail
    if (item !== undefined) {
      item.focus();
      this.focusedItem = item;
      this.scrollToItem(item);
    }
  }

  unfocus() {
    if (this.focusedItem !== undefined) {
      this.focusedItem.unfocus();
    }

    this.focusedItem = undefined;
  }

  focusNext() {
    let index = this.getFocusedIndex();
    if (index === undefined) {
      index = -1;
    }

    const items = this.listItems.toArray();
    if (index !== items.length - 1) {
      this.focus(items[index + 1]);
    }
  }

  focusPrevious() {
    const index = this.getFocusedIndex();
    const items = this.listItems.toArray();
    if (index !== 0) {
      this.focus(items[index - 1]);
    }
  }

  select(item?: ListItemDirective) {
    this.unselect();

    if (item !== undefined) {
      item.select();
      this.selectedItem = item;
      this.focusedItem = item;
      this.scrollToItem(item);
    }
  }

  unselect() {
    this.unfocus();

    if (this.selectedItem !== undefined) {
      this.selectedItem.unselect();
    }

    this.selectedItem = undefined;
  }

  enableNavigation() {
    if (this.navigation) {
      this.navigationEnabled = true;
    }
  }

  disableNavigation() {
    this.navigationEnabled = false;
  }

  private init() {
    this.subscribe();

    const selectedItem = this.findSelectedItem();
    if (selectedItem) {
      this.select(selectedItem);
    } else {
      this.focus(this.findFocusedItem());
    }

    this.enableNavigation();
  }

  private subscribe() {
    this.unsubscribe();

    this.listItems.toArray().forEach(item => {
      this.subscriptions.push(item.clickItem.subscribe(
        (item_: ListItemDirective) => this.select(item_)));
    }, this);
  }

  private unsubscribe() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }

  private findSelectedItem() {
    return this.listItems.toArray().find(item => item.selected);
  }

  private findFocusedItem() {
    return this.listItems.toArray().find(item => item.focused);
  }

  private getFocusedIndex () {
    return this.listItems.toArray().findIndex(
      item => item === this.focusedItem);
  }

  private navigate(key: number) {
    switch (key) {
      case 38:
        this.focusPrevious();
        break;
      case 40:
        this.focusNext();
        break;
      default:
        break;
    }
  }

  private scrollToItem(item: ListItemDirective) {
    this.el.nativeElement.scrollTop = item.getOffsetTop();
  }
}
