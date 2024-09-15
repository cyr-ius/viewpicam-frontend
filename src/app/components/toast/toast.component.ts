import { Component, computed, ElementRef, OnInit, viewChild, viewChildren } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import bootstrap from 'bootstrap';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html'
})
export class ToastComponent implements OnInit{

  toastList = viewChild.required<ElementRef>('toastlist')
  toastChildren= viewChildren<ElementRef>('toast')

  toasts$ = computed(() => this.toastService.toasts())

  observer!: MutationObserver;

  constructor(
    private toastService: ToastService
  ){}

  ngOnInit(): void {
    this.observer = new MutationObserver((mutations:MutationRecord[]) => {
      mutations.forEach((mutation:MutationRecord) => {
        if (mutation.type == 'childList') {
          this.toastChildren().forEach(item => {
            const toast = new window.bootstrap.Toast(item.nativeElement)
            toast.show();
            item.nativeElement.addEventListener("hide.bs.toast", (event: any) => {
              item.nativeElement.remove()
            });
          })
        }
      })
    });
    this.observer.observe(this.toastList()?.nativeElement, { attributes: true, childList: true, subtree: true });
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

}
