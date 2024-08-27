import { Directive , ElementRef,HostListener,Renderer2} from '@angular/core';

@Directive({
  selector: '[appHightlighttext]',
  standalone: true
})
export class HightlighttextDirective {

  constructor(private elementRef:ElementRef,private render:Renderer2) { }

  private highlight(color?:string){
    this.render.setStyle(this.elementRef.nativeElement,'color',color);
  }

  @HostListener('mouseenter')onMouseEnter(){
    this.highlight('blue');
  }
  @HostListener('mouseleave') onMouseLeave(){
    this.highlight('');
  }

}
