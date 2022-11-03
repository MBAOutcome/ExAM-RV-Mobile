import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading = false;
  public static twlioURL:any;
  
  constructor(public loadingController: LoadingController) { }

  async showLoading(content) {
    this.isLoading = true;
     await this.loadingController.create({
      // duration: 5000,
      message:content?content:''
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
      });
    });
  }

  async hideLoading() {
    this.isLoading = false;
    await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

}
