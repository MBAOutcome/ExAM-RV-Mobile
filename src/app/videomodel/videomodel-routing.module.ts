import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideomodelPage } from './videomodel.page';

const routes: Routes = [
  {
    path: '',
    component: VideomodelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideomodelPageRoutingModule {}
