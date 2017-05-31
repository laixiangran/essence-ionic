/**
 * Created by laixiangran on 2016/8/6.
 * homepage：http://www.laixiangran.cn
 */

import { Component } from "@angular/core";
import { EssenceIonAMapComponent } from "../../../../dist/essence-ion-amap/essence-ion-amap.component";

@Component({
    selector: 'page-amap',
    templateUrl: "amap.html"
})
export class AmapPage {
    amapComponent: EssenceIonAMapComponent; // 当前地图控件对象
    amap: any; // 当前地图对象
    amapOpts: any; // 初始化地图参数

    constructor() {}

    /**
     * 地图加载完成
     * @param $event
     */
    amapReady ($event: EssenceIonAMapComponent) {
        this.amapComponent = $event;
        this.amap = $event.getMap();
    }

    amapDestroy ($event) {
        console.log($event);
    }
}
