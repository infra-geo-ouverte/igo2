import { Component, Input, Output, OnInit, OnChanges, OnDestroy, EventEmitter, AfterViewInit, AfterContentInit, SimpleChanges,
        ViewContainerRef, ViewChild, ComponentRef, ComponentFactory, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';
import { ToolsService } from "./tools.service";

import * as toolsComponent from "./index";
import * as ext from "../../extensions/outilsExt";

@Component({
  moduleId: module.id,
  selector: 'igo-tools',
  templateUrl: 'tools.component.html',
  styleUrls: ['tools.component.css']
})

export class ToolsComponent implements AfterViewInit, OnChanges, OnDestroy, OnInit {
  @ViewChild('target', {read: ViewContainerRef}) target: any;
  cmpRef: any; // ComponentRef;
  protected hasLocationTool: boolean = false;

  private isViewInitialized: boolean = false;
  private contextId: string;
  private tools: any = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private cdRef: ChangeDetectorRef, private toolsService: ToolsService,
              private route: ActivatedRoute) {

    this.route.params.subscribe((params: Params) => this.contextId = params['id']);
  }

  public ngOnInit() {

    this.toolsService.get(this.contextId)
      .subscribe(
        (tools: any) => {
          this.tools = tools;
          this.updateComponent();
        },
          // error => this.errorMessage = <any>error
      );
  }

  /*private initTools(tools: any): any {
    if (tools[0] && tools[0].type === "location") {
      this.hasLocationTool = true;
    }
  }*/


  updateComponent() {
    if (!this.isViewInitialized) {
      return;
    }
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }

    for (let entry of this.tools) {
      let compStr: string = entry.type + 'Component';
      let entryComp: any = (<any> ext)[compStr] || (<any> toolsComponent)[compStr];
      if (!entryComp) {
        continue;
      }
      let factory = this.componentFactoryResolver.resolveComponentFactory(entryComp);
      this.cmpRef = this.target.createComponent(factory);
    }
    // to access the created instance use
    // this.cmpRef.instance.someProperty = 'someValue';
    // this.cmpRef.instance.fsomeOutput.subscribe(val => doSomething());
    this.cdRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateComponent();
  }

  ngAfterViewInit() {
    this.isViewInitialized = true;
    this.updateComponent();
  }

  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }



}
