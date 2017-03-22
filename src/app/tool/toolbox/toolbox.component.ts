import { AfterViewInit, ChangeDetectorRef, Component,
         ComponentRef, ComponentFactoryResolver,
         OnDestroy, OnInit, ViewContainerRef, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';
import { IgoStore } from '../../store/store';

import { Observer } from '../../utils/observer';

import { Tool } from '../shared/tool.interface';
import { ToolComponent } from '../shared/tool-component';
import { ToolService } from '../shared/tool.service';
import { toolSlideInOut} from './toolbox.animation';

@Component({
  selector: 'igo-toolbox',
  templateUrl: 'toolbox.component.html',
  styleUrls: ['toolbox.component.styl'],
  animations: [
    toolSlideInOut
  ]
})
export class ToolboxComponent
  extends Observer implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild('target', {read: ViewContainerRef}) target: ViewContainerRef;

  public tools: Tool[];
  public selectedTool: Tool;
  public toolState: string = 'center';

  private toolHistory: Tool[] = [];
  private component: ComponentRef<ToolComponent>;
  private viewInitialized: boolean = false;

  constructor(private store: Store<IgoStore>,
              private resolver: ComponentFactoryResolver,
              private cdRef: ChangeDetectorRef,
              private toolService: ToolService) {
    super();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(s => s.toolHistory)
        .distinctUntilChanged()
        .subscribe((toolHistory: Tool[]) =>
          this.handleToolHistoryChanged(toolHistory)));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.viewInitialized = false;
    this.destroyComponent();
  }

  ngAfterViewInit() {
    this.viewInitialized = true;
    this.createComponent();
  }

  private handleToolHistoryChanged(toolHistory?: Tool[]) {
    const depth = toolHistory.length;
    this.toolState = depth > this.toolHistory.length ? 'right' : 'left';

    this.toolHistory = toolHistory;
    this.selectTool(toolHistory[toolHistory.length - 1]);
  }

  private selectTool(tool: Tool) {
    this.selectedTool = tool;

    if (this.viewInitialized) {
      if (this.selectedTool) {
        this.createComponent();
      } else {
        this.destroyComponent();
      }
    }

    this.toolState = 'center';
  }

  private createComponent() {
    const tool = this.selectedTool;

    if (!this.viewInitialized || !tool) {
      return;
    }

    /* If the component is created already, simply update its options */
    if (this.component && this.component.instance.name === tool.name) {
      this.component.instance.options = tool.options;
      return;
    }

    const toolCls = this.toolService.getToolClass(tool.name);
    if (toolCls === undefined) {
      return;
    }

    this.destroyComponent();

    const factory = this.resolver.resolveComponentFactory(<any>toolCls);
    const component = this.target.createComponent(factory);

    this.component = component as ComponentRef<ToolComponent>;
    this.component.instance.name = tool.name;
    this.component.instance.options = tool.options;

    this.cdRef.detectChanges();
  }

  private destroyComponent() {
    if (this.component !== undefined) {
      this.component.destroy();
    }
  }
}
