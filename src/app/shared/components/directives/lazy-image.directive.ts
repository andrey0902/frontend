import {Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[ltLazyImage]'
})
export class LazyImageDirective implements OnInit {
  private _bigImg: string;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
  }

  @Input() set ltLazyImage(img: string) {
    if (img) {
      this._bigImg = img;
    }
  }


  public ngOnInit(): void {
    const img = new Image();
    img.src = this._bigImg;
    img.onload = () => {
      console.log(this.templateRef);
     // console.log(this.templateRef.createEmbeddedView(img));
     // this.viewContainer.createEmbeddedView(this.templateRef, img);
    };
  }
}
