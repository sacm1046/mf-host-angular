import { Injectable, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

@Injectable({
  providedIn: 'root'
})
export class WebComponentLoaderService {
  constructor(private injector: Injector) {}

  async loadWebComponent(modulePath: string, componentName: string): Promise<void> {
    const { default: webComponentModule } = await import(modulePath);
    
    const element = createCustomElement(webComponentModule[componentName], {
      injector: this.injector
    });
    customElements.define(componentName, element);
  }
}
