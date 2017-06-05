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
            './assets/videos/video.mp4',
            'http://www.laixiangran.cn/CDN/custom/video/test.mp4',
            'http://www.laixiangran.cn/CDN/custom/video/test2.mp4'
        ];
    }

    onVideoReady($event: any) {
        // console.log($event);
    }

    onVideoPan($event: any) {
        // console.log($event);
    }

    onVideoError($event: any) {
        // console.log($event);
    }
}
