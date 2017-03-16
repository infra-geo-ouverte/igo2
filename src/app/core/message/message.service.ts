import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Message } from './message.interface';

interface MessageOptions {
  timeOut: number;
}

@Injectable()
export class MessageService {

  constructor(private notificationService: NotificationsService) { }

  success(text: string, title?, options?: MessageOptions) {
    this.notificationService.success(title, text, options);
  }

  error(text: string, title?, options?: MessageOptions) {
    this.notificationService.error(title, text, options);
  }

  warn(text: string, title?, options?: MessageOptions) {
    this.notificationService.alert(title, text, options);
  }

  info(text: string, title?, options?: MessageOptions) {
    this.notificationService.info(title, text, options);
  }

  html(text: string, type: string, options?: MessageOptions) {
    this.notificationService.html(text, type, options);
  }

  message(message: Message, options?: MessageOptions) {
    this.notificationService.error(message.title, message.text, options);
  }

  remove() {
    this.notificationService.remove();
  }

}
