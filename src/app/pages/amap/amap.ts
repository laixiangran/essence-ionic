/**
 * Created by laixiangran on 2016/8/6.
 * homepage：http://www.laixiangran.cn
 */

import { Component } from '@angular/core';
import { EssenceIonAMapComponent } from '../../components';

@Component({
	selector: 'page-amap',
	templateUrl: 'amap.html'
})
export class AmapPage {
	amapComponent: EssenceIonAMapComponent; // 当前地图控件对象
	amap: any; // 当前地图对象
	apiKey: string =  '92876784ab731cccce8ebd5a8030290f';
	webApiKey: string = '0df36377c23e75585d4ed4fcb4baf807';

	constructor() {
	}

	/**
	 * 地图加载完成
	 * @param $event
	 */
	amapReady($event: EssenceIonAMapComponent) {
		this.amapComponent = $event;
		this.amap = $event.getMap();
	}

	amapDestroy($event) {
		console.log($event);
	}
}
