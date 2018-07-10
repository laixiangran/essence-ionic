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
import { EssenceIonMediaComponent } from './essence-ion-media/essence-ion-media.component';
import { ImagePicker } from '@ionic-native/image-picker';
import { MediaCapture } from '@ionic-native/media-capture';

const components: any[] = [
	EssenceIonVideoplayerComponent,
	EssenceIonAMapComponent,
	EssenceIonCalendarComponent,
	EssenceIonMediaComponent
];

@NgModule({
	imports: [
		CommonModule,
		IonicModule
	],
	declarations: components,
	entryComponents: components,
	exports: components,
	providers: [
		MediaCapture,
		ImagePicker
	]
})
export class EssenceIonicModule {
}

