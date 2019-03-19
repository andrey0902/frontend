import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ltUserPermission]'
})
export class UserPermissionDirective {
  private defoultPermission = 'admin';
  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  @Input()
  set ltUserPermission(val) {
    if (this.checkPermission(val)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private checkPermission(val: string[]): boolean {
    if (val) {
      return val.some((item: string) => item.toLocaleLowerCase() === this.defoultPermission);
    }
    return false;
  }
}
