import { MessageType } from './message-type';

export interface Message {
  title?: string;
  text: string;
  type?: MessageType;
  format?: 'text' | 'html';
}
