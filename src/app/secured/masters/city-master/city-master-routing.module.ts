import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CityMasterPage } from './city-master.page';

const routes: Routes = [
  {
    path: '',
    component: CityMasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CityMasterPageRoutingModule {}
