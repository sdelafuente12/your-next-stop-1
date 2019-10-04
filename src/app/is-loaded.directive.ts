import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[tileIsLoaded]'
})
export class IsLoadedDirective {

  constructor() { }

  @HostListener('load')
  onLoad() {
    console.log('loaded')
  }
}
