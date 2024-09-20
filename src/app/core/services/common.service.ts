import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ToastMessage } from '../models/app-models';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  static copyToClipboard: CommonService;

  constructor(
    private Toast: ToastService
  ) {}

  handleError(error: Error, errorValue:any){
    this.Toast.add(<ToastMessage>({type:"ERROR", message:error.message}));
    return of(errorValue);
  }

  copyToClipboard(value:string){
    navigator.clipboard.writeText(value).then(
        function(){ alert("yeah!");  }) // success
      .catch(function() { alert("err"); }); // error
  }

  subscribeError(error: HttpErrorResponse) {
    let message = `${error.name} (${error.status})`;
    if ('error' in error) {
      message = error.error.message;
    }
    return message;
  }

  downLoadFile(data: any, filename:string) {
    let dataType = data.type;
    let binaryData = [];
    binaryData.push(data);
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
    downloadLink.setAttribute('download', filename);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
}
