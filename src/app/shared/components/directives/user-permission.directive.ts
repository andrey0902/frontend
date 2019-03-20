import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ltUserPermission]'
})
export class UserPermissionDirective {
  private defaultPermission = 'admin';
  private view = null;
  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  @Input()
  set ltUserPermission(val) {
    if (this.checkPermission(val) && !this.view) {
      this.view = this.viewContainer.createEmbeddedView(this.templateRef);
    } else if (!this.checkPermission(val)) {
      this.viewContainer.clear();
      this.view = null;
    }
  }

  private checkPermission(val: string[]): boolean {
    if (val) {
      return val.some((item: string) => item.toLocaleLowerCase() === this.defaultPermission);
    }
    return false;
  }
}
