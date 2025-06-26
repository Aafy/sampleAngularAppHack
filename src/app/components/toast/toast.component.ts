import { Component } from '@angular/core';
declare const Toastify: any;
@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  show() {
    Toastify({
      text: 'Success',
      duration: 5000,
      // close: true,
      backgroundColor: 'linear-gradient(to right, #2ECC71, #2ECC71)',
      gravity: 'top', // `top` or `bottom`
      position: 'center', // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      onClick: this.callB, // Callback after click
    }).showToast();
    //amber -  backgroundColor: "linear-gradient(to right, #E74C3C, #E74C3C)"
    //based on color not on type
  }
  callB(ev: any) {
    console.log(ev); // 'Invoked on toast click not on close click'
  }
}
//npm i ngx-toastr -> resolving dependencies is difficult
//Also ngx-toastr ( With progress bar)
// https://stackblitz.com/edit/angular-toster?file=src%2Fapp%2Fapp.component.ts
//https://ngx-toastr.vercel.app/
// https://www.npmjs.com/package/ngx-toastr?activeTab=readme
