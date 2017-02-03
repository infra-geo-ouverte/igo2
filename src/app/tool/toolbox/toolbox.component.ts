import { AfterViewInit, ChangeDetectorRef, Component,
         ComponentRef, ComponentFactoryResolver, Input,
         OnChanges, OnDestroy, SimpleChanges,
         ViewContainerRef, ViewChild } from '@angular/core';

import { Tool } from '../shared/tool.interface';
import { ToolComponent } from '../shared/tool-component.model';
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

    this.destroy();

    let component, factory, toolCls;

    for (const tool of this.tools) {
      toolCls = this.toolService.getToolClass(tool.name);
      if (this.tool.name !== tool.name || toolCls === undefined) {
        continue;
      }

      factory = this.resolver.resolveComponentFactory(toolCls);
      component = this.target.createComponent(factory);
      component.instance.name = tool.name;
      component.instance.options = tool.options;

      this.component = component as ComponentRef<ToolComponent>;
    }

    this.cdRef.detectChanges();
  }

  destroy() {
    if (this.component !== undefined) {
      this.component.destroy();
    }
  }
}
