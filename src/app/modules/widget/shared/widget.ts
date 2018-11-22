import { Component } from '@angular/core';

export class WidgetClass {

  activate() {

  }

  deactivate() {

  }
}

export abstract class WidgetWithUI {

  abstract getComponent(): Component;

}
