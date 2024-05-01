import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CityMasterPageRoutingModule } from './city-master-routing.module';

import { CityMasterPage } from './city-master.page';
import { SharedModule } from 'src/app/core/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CityMasterPageRoutingModule,
        SharedModule
    ],
    declarations: [CityMasterPage]
})
export class CityMasterPageModule { }
