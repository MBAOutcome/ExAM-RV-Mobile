import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { EditLinkPageRoutingModule } from './edit-link-routing.module';

import { EditLinkPage } from './edit-link.page';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    EditLinkPageRoutingModule
  ],
  declarations: [EditLinkPage]
})
export class EditLinkPageModule {}
