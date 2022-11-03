import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoaderService } from './services/loader.service';
import {HomePage} from './home/home.page';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public static twlioURL:any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loaderservice: LoaderService,
    private router: Router,
    private authenticationService: AuthenticationService

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(true);
      
      if(this.platform.is('ios')){
        this.statusBar.backgroundColorByHexString('#ffffff');
      }else{
        this.statusBar.backgroundColorByHexString('#4B7DB4');
      }
      this.statusBar.styleLightContent();
      this.statusBar.show();

    
      this.splashScreen.hide();
      var _this = this;
      _this.authenticationService.authenticationState.subscribe(state => {        
        if (state) {          
          _this.router.navigate(['/home']);
        } else {  
        }
      }, function(autherror){
          _this.splashScreen.hide();
      });
    });
  }
}
