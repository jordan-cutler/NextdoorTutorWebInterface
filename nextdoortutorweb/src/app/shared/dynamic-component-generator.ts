import {
  ComponentFactory, ComponentFactoryResolver, ComponentRef, Type,
  ViewContainerRef
} from '@angular/core';

export class DynamicComponentGenerator<T> {
  private componentFactoryResolver: ComponentFactoryResolver;
  private viewContainerRef: ViewContainerRef;

  factory: ComponentFactory<T>;
  component: ComponentRef<T>;

  constructor(componentFactoryResolver: ComponentFactoryResolver,
              viewContainerRef: ViewContainerRef,
              component: Type<T>) {
    this.componentFactoryResolver = componentFactoryResolver;
    this.viewContainerRef = viewContainerRef;
    this.factory = this.componentFactoryResolver.resolveComponentFactory(component);
  }

  destroyComponentIfExists() {
    if (this.component) {
      this.component.destroy();
    }
  }

  createComponent() {
    this.component = this.viewContainerRef.createComponent(this.factory);
  }

  getComponentInstance() {
    if (this.component) {
      return this.component.instance;
    }
  }

  addComponentToDom() {
    this.component.changeDetectorRef.detectChanges();
  }


}
