import {Injectable} from "@angular/core";
import {Level} from "./level";

const CONSOLE_DEBUG_METHOD = console["debug"] ? "debug" : "log";

@Injectable()
export class Logger {
  private _level: Level = Level.WARN;

  public log(msg: any)   { if (this.level >= Level.LOG) { console.log(msg); } }

  public debug(msg: any)  { if (this.level >= Level.DEBUG) { (<any> console)[CONSOLE_DEBUG_METHOD](msg); } }

  public info(msg: any)  { if (this.level >= Level.INFO) { console.log(msg); } }

  public warn(msg: any)  { if (this.level >= Level.WARN) { console.warn(msg); } }

  public error(msg: any) { if (this.level >= Level.ERROR) { console.error(msg); } }

  public get level(): Level { return ( <any> window ).logLevel || this._level; }

  public set level(level: Level) {
      this._level = level;
  }
}
