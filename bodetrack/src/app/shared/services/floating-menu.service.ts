import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FloatingMenuService {
  public show = false;
  public top = 0;
  public left = 0;
  public data: any = null;

  open(event: MouseEvent, data: any) {
    event.stopPropagation();
    const button = (event.target as HTMLElement).closest('button');
    if (!button) return;
    const rect = button.getBoundingClientRect();

    if (this.show && this.data === data) {
      this.close();
      return;
    }

    this.show = true;
    this.top = rect.bottom + window.scrollY;
    this.left = rect.left + window.scrollX;
    this.data = data;

    setTimeout(() => {
      window.addEventListener('click', this.close);
    });
  }

  close = () => {
    this.show = false;
    this.data = null;
    window.removeEventListener('click', this.close);
  };
}
