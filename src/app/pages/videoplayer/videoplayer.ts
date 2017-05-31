/**
 * Created by laixiangran on 2016/8/6.
 * homepage：http://www.laixiangran.cn
 */

import { Component } from "@angular/core";

@Component({
    selector: 'page-videoplayer',
    templateUrl: "videoplayer.html"
})
export class VideoplayerPage {
    videos: string[];

    constructor() {
        this.videos = [
            'http://www.laixiangran.cn/CDN/custom/video/test6.mp4',
            'http://www.laixiangran.cn/CDN/custom/video/test.mp4',
            'http://www.laixiangran.cn/CDN/custom/video/test.mp4'
        ];
    }

    videoViewerReady($event: any) {
        console.log($event);
    }
}
