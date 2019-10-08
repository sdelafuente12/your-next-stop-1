import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'htmlSanitizer'
})
export class HtmlSanitizerPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(URI: any, ...args: any[]): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(URI);
  }

}
