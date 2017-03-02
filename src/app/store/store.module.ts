import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideStore } from '@ngrx/store';

import {throwIfAlreadyLoaded } from '../core/module-import.guard';

import {
  activeContext,
  editedContext,
  mapView,
  mapLayers,
  selectedTool,
  toolsList,
  searchResults,
  selectedResult,
  focusedResult
} from './reducers';


export function provideIgoStore() {
  return provideStore({
    activeContext: activeContext,
    editedContext: editedContext,
    mapView: mapView,
    mapLayers: mapLayers,
    selectedTool: selectedTool,
    searchResults: searchResults,
    selectedResult: selectedResult,
    focusedResult: focusedResult,
    tools: toolsList
  });
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class StoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StoreModule,
      providers: [
        provideIgoStore()
      ]
    };
  }

  constructor( @Optional() @SkipSelf() parentModule: StoreModule) {
    throwIfAlreadyLoaded(parentModule, 'StoreModule');
  }
}
