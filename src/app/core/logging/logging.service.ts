import { Injectable } from '@angular/core';
import { LoggingLevel } from './logging-level';

@Injectable()
export class LoggingService {
  private level: LoggingLevel = LoggingLevel.WARN;

  public log(msg: any)   { if (this.level >= LoggingLevel.LOG) { console.log(msg); } }

  public debug(msg: any)  { if (this.level >= LoggingLevel.DEBUG) { console.log(msg); } }

  public info(msg: any)  { if (this.level >= LoggingLevel.INFO) { console.log(msg); } }

  public warn(msg: any)  { if (this.level >= LoggingLevel.WARN) { console.warn(msg); } }

  public error(msg: any) { if (this.level >= LoggingLevel.ERROR) { console.error(msg); } }

}
