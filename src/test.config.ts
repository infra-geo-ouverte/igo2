import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import localeFrCaExtra from '@angular/common/locales/extra/fr-CA';
import localeFrCa from '@angular/common/locales/fr-CA';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestModuleMetadata } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

registerLocaleData(localeFrCa, localeFrCaExtra);

export const testConfig: TestModuleMetadata = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideHttpClientTesting(),
    provideRouter([])
  ]
};

export function mergeTestConfig(
  moduleDef: TestModuleMetadata
): TestModuleMetadata {
  console.log();
  return {
    ...moduleDef,
    providers: [...(moduleDef.providers ?? []), ...testConfig.providers!]
  };
}
