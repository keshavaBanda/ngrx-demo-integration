import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoLeadingSpace]'
})
export class NoLeadingSpaceDirective {

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    const originalValue = input.value;
    const newValue = originalValue.replace(/^\s+/, '');

    if (originalValue !== newValue) {
      input.value = newValue;
    }
  }
}
