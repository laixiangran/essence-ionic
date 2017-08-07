/**
 * Created by laixiangran on 2017/5/31.
 * homepage：http://www.laixiangran.cn.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { EssenceIonAMapComponent } from './essence-ion-amap/essence-ion-amap.component';
import { EssenceIonVideoplayerComponent } from './essence-ion-videoplayer/essence-ion-videoplayer.component';
import { EssenceIonCalendarComponent } from './essence-ion-calendar/essence-ion-calendar.component';

const components: any[] = [
	EssenceIonVideoplayerComponent,
	EssenceIonAMapComponent,
	EssenceIonCalendarComponent
];

@NgModule({
	imports: [
		CommonModule,
		IonicModule
	],
	declarations: components,
	entryComponents: components,
	exports: components
})
export class EssenceIonicModule {
	static setAMapKey(config: {apiKey: string, webApiKey: string}) {
		EssenceIonAMapComponent.webApiKey = config.webApiKey;
		EssenceIonAMapComponent.apiKey = config.apiKey;
	};
}

