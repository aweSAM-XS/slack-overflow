import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: 'textarea[autoResize]',
  standalone: true,
})
export class AutoResizeTextareaDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.adjustTextareaHeight();
  }

  @HostListener('input')
  onInput() {
    this.adjustTextareaHeight();
  }

  private adjustTextareaHeight() {
    const textarea = this.elementRef.nativeElement as HTMLTextAreaElement;
    textarea.style.overflow = 'hidden';
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

    const container = textarea.parentNode;
    const fadeElement = document.createElement('div');
    fadeElement.className = 'fade-element';
    fadeElement.style.height = `${textarea.scrollHeight}px`;
    container!.appendChild(fadeElement);
  }
}
