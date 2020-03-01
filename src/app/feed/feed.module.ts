import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FeedPage } from './feed.page';
import { PublicationComponent } from '../components/publication/publication.component';
import { PopoverComponent } from '../components/popover/popover.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: FeedPage }])
  ],
  declarations: [FeedPage, PublicationComponent, PopoverComponent],
  entryComponents: [PopoverComponent]
})
export class FeedPageModule {}
