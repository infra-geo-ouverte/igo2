import { AfterViewInit, ChangeDetectorRef, Component,
         ComponentRef, ComponentFactoryResolver, Input,
         OnChanges, OnDestroy, SimpleChanges,
         ViewContainerRef, ViewChild } from '@angular/core';

import { Tool } from '../shared/tool.interface';
import { ToolComponent } from '../shared/tool-component';
import { ToolService } from '../../core/tool.service';

@Component({
  selector: 'igo-toolbox',
  templateUrl: 'toolbox.component.html',
  styleUrls: ['toolbox.component.styl'],
  entryComponents: [ToolService.toolClasses]
})
export class ToolboxComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('target', {read: ViewContainerRef}) target: ViewContainerRef;

  @Input('tools') tools: Tool[];
  @Input('tool') tool: Tool;

  private component: ComponentRef<ToolComponent>;
  private isViewInitialized: boolean = false;

  constructor(private resolver: ComponentFactoryResolver,
              private cdRef: ChangeDetectorRef,
              private toolService: ToolService) {
  }

  ngOnDestroy() {
    this.destroy();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.createComponent();
  }

  ngAfterViewInit() {
    this.isViewInitialized = true;
    this.createComponent();
  }

  createComponent() {
    if (!this.isViewInitialized || !this.tool) {
      return;
    }

    /* If the component is created already, simply update its options */
    if (this.component && this.component.instance.name === this.tool.name) {
      this.component.instance.options = this.tool.options;
      return;
    }

    const toolCls = this.toolService.getToolClass(this.tool.name);
    if (toolCls === undefined) {
      return;
    }

    this.destroy();

    const factory = this.resolver.resolveComponentFactory(<any>toolCls);
    const component = this.target.createComponent(factory);

    this.component = component as ComponentRef<ToolComponent>;
    this.component.instance.name = this.tool.name;
    this.component.instance.options = this.tool.options;

    this.cdRef.detectChanges();
  }

  destroy() {
    if (this.component !== undefined) {
      this.component.destroy();
    }
  }
}
