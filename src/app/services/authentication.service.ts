import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);

  constructor(
    private plt: Platform,
    private deeplinks: Deeplinks
  ) { 
    this.plt.ready().then(() => {
      this.checkToken();
     });

   }
   checkToken() {
    var _this = this;
   /* this.deeplinks.route({
      '/':{}
     }).subscribe(match => {
       // match.$route - the route we matched, which is the matched entry from the arguments to route()
       // match.$args - the args passed in the link
       //console.log('agr:::',match.$args);
       // match.$link - the full link data
       console.log('Successfully matched route', match);
       if(match.$args){
         console.log('inside:::: Successfully matched route', match);
         AppComponent.twlioURL = match.$args;
         console.log('LoaderService.twlioURL:: matched route', AppComponent.twlioURL);
         return this.authenticationState.next(true);
       }
     }, nomatch => {
       // nomatch.$link - the full link data
       console.error('Got a deeplink that didn\'t match', nomatch);
       alert();
       return this.authenticationState.next(false);
     });*/
     return this.authenticationState.next(true);

   }
   isAuthenticated() {
    return this.authenticationState.value;
  }
}
