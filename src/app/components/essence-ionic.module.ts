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

	static initAMapAPI(config: { apiKey: string }) {
		const head = document.getElementsByTagName('head')[0],
			script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = `http://webapi.amap.com/maps?v=1.3&key=${config.apiKey}`;
		head.appendChild(script);
		EssenceIonAMapComponent.apiKey = config.apiKey;
		return this;
	}
}

