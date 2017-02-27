import { AfterViewInit, ChangeDetectorRef, Component,
         ComponentRef, ComponentFactoryResolver,
         OnChanges, OnDestroy, OnInit, SimpleChanges,
         ViewContainerRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppStore } from '../../app.store';
import { Tool } from '../shared/tool.interface';
import { ToolComponent } from '../shared/tool-component';
import { ToolService } from '../../core/tool.service';

@Component({
  selector: 'igo-toolbox',
  templateUrl: 'toolbox.component.html',
  styleUrls: ['toolbox.component.styl']
})
export class ToolboxComponent implements AfterViewInit, OnChanges, OnDestroy, OnInit {
  @ViewChild('target', {read: ViewContainerRef}) target: ViewContainerRef;

  tools: Tool[];
  selectedTool: Tool;

  private component: ComponentRef<ToolComponent>;
  private isViewInitialized: boolean = false;

  constructor(private store: Store<AppStore>,
              private resolver: ComponentFactoryResolver,
              private cdRef: ChangeDetectorRef,
              private toolService: ToolService) {
  }

  ngOnInit() {
    this.store
      .select(s => s.selectedTool)
      .subscribe((tool: Tool) => {
          this.selectedTool = tool;
       });
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
    if (!this.isViewInitialized || !this.selectedTool) {
      return;
    }

    /* If the component is created already, simply update its options */
    if (this.component && this.component.instance.name === this.selectedTool.name) {
      this.component.instance.options = this.selectedTool.options;
      return;
    }

    const toolCls = this.toolService.getToolClass(this.selectedTool.name);
    if (toolCls === undefined) {
      return;
    }

    this.destroy();

    const factory = this.resolver.resolveComponentFactory(<any>toolCls);
    const component = this.target.createComponent(factory);

    this.component = component as ComponentRef<ToolComponent>;
    this.component.instance.name = this.selectedTool.name;
    this.component.instance.options = this.selectedTool.options;

    this.cdRef.detectChanges();
  }

  destroy() {
    if (this.component !== undefined) {
      this.component.destroy();
    }
  }
}
