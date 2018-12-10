import { Component, EventEmitter } from '@angular/core';

export class WidgetClass {

  activate() {

  }

  deactivate() {

  }
}

export abstract class WidgetWithUI {

  abstract getComponent(): Component;

}

export abstract class WidgetComponent {

  public complete: EventEmitter<any>;
  public cancel: EventEmitter<any>;

}
