import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { createCustomElement } from '@angular/elements';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('angularCardComponent', { read: ViewContainerRef }) angularCardComponent!: ViewContainerRef;
  constructor(private injector: Injector) { }

  loadMFComponent() {
    loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './CardModule'
    }).then((m) => {
      const webComponent = createCustomElement(m.CardComponent, { injector: this.injector });
      customElements.define('co-angular-card', webComponent);
    })
  }

  loadMFComponentReact() {
    loadRemoteModule({
      type: 'script',
      remoteEntry: 'http://localhost:4202/remoteEntry.js',
      remoteName: 'react',
      exposedModule: './CounterModule',
    })
  }

  ngOnInit() {
    this.loadMFComponent()
    this.loadMFComponentReact()
  }
}
