import { Directive,ElementRef,Input,TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIfdirective]',
  standalone: true
})
export class IfdirectiveDirective {

  constructor(private templateRef:TemplateRef<any>,private viewContainerRef:ViewContainerRef) { }

  @Input() set appIfdirective(condition:boolean){
    if(condition){
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    }else{
      this.viewContainerRef.clear();
    }
  }

}
