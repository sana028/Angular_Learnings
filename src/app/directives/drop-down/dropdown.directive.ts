import { Directive, HostListener } from '@angular/core';
import { HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  standalone: true
})
export class DropdownDirective {

  constructor() { }

  @HostBinding('class.open') isOpen:boolean = false;

  @HostListener('click') toggleDropDown(){
    this.isOpen = !this.isOpen;
  }

}
