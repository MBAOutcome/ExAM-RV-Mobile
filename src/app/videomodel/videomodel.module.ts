import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideomodelPageRoutingModule } from './videomodel-routing.module';

import { VideomodelPage } from './videomodel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideomodelPageRoutingModule
  ],
  declarations: [VideomodelPage]
})
export class VideomodelPageModule {}
