import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toastr: ToastrService) {}

  displaySuccessMessage = (message: string, time: number) => {
    this.toastr.success(message, 'success', {
      positionClass: 'toast-top-right',
      timeOut: time,
      progressAnimation: 'increasing',
      progressBar: true,
    });
  };

  displayErrorMesssage = (message: string, time: number) => {
    this.toastr.error(message, 'Error', {
      positionClass: 'toast-top-right',
      timeOut: time,
      progressAnimation: 'increasing',
      progressBar: true,
    });
  };

  displayInfoMessage = (message: string, time: number) => {
    this.toastr.info(message, 'Info', {
      positionClass: 'toast-top-right',
      timeOut: time,
      progressAnimation: 'increasing',
      progressBar: true,
    });
  };

  displayWarningMessage = (message: string, time: number) => {
    this.toastr.warning(message, 'Warning', {
      positionClass: 'toast-top-right',
      timeOut: time,
      progressAnimation: 'increasing',
      progressBar: true,
    });
  };
}
