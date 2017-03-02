import { AfterViewInit, ChangeDetectorRef, Component,
         ComponentRef, ComponentFactoryResolver,
         OnDestroy, OnInit, ViewContainerRef, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';
import { IgoStore } from '../../store/store';

import { Tool } from '../shared/tool.interface';
import { ToolComponent } from '../shared/tool-component';
import { ToolService } from '../shared/tool.service';

@Component({
  selector: 'igo-toolbox',
  templateUrl: 'toolbox.component.html',
  styleUrls: ['toolbox.component.styl']
})
export class ToolboxComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('target', {read: ViewContainerRef}) target: ViewContainerRef;

  tools: Tool[];
  selectedTool: Tool;

  private component: ComponentRef<ToolComponent>;
  private viewInitialized: boolean = false;

  constructor(private store: Store<IgoStore>,
              private resolver: ComponentFactoryResolver,
              private cdRef: ChangeDetectorRef,
              private toolService: ToolService) {
  }

  ngOnInit() {
    this.store
      .select(s => s.selectedTool)
      .distinctUntilChanged()
      .subscribe((tool: Tool) => this.selectTool(tool));
  }

  ngOnDestroy() {
    this.viewInitialized = false;
    this.destroy();
  }

  ngAfterViewInit() {
    this.viewInitialized = true;
    this.createComponent();
  }

  private selectTool(tool: Tool) {
    this.selectedTool = tool;
    if (this.viewInitialized) {
      this.createComponent();
    }
  }

  private createComponent() {
    if (!this.viewInitialized || !this.selectedTool) {
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

  private destroy() {
    if (this.component !== undefined) {
      this.component.destroy();
    }
  }
}
