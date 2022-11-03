import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditLinkPage } from './edit-link.page';

const routes: Routes = [
  {
    path: '',
    component: EditLinkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditLinkPageRoutingModule {}
