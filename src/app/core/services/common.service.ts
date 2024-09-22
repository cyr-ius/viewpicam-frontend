import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { BASE_URL } from '../../core/tokens/app.token';
import { ToastMessage, ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  BASE_URL = inject(BASE_URL);

  static copyToClipboard: CommonService;

  constructor(private Toast: ToastService) {}

  handleError(error: Error, errorValue: any) {
    this.Toast.add(<ToastMessage>{ type: 'ERROR', message: error.message });
    return of(errorValue);
  }

  handleErrorDetail(message: string, errorValue: any) {
    this.Toast.add(<ToastMessage>{ type: 'ERROR', message: message });
    return of(errorValue);
  }


  copyToClipboard(value: string | null | undefined) {
    if (value) {
      navigator.clipboard
        .writeText(value)
        .then(function () {
          alert('yeah!');
        }) // success
        .catch(function () {
          alert('err');
        }); // error
    }
  }

  subscribeError(error: HttpErrorResponse) {
    let message = `${error.name} (${error.status})`;
    if ('error' in error) {
      message = error.error.message;
    }
    return message;
  }

  downLoadFile(data: any, filename: string) {
    let dataType = data.type;
    let binaryData = [];
    binaryData.push(data);
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(
      new Blob(binaryData, { type: dataType })
    );
    downloadLink.setAttribute('download', filename);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
}
