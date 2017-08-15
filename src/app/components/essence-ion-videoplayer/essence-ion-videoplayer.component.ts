/**
 * Created by laixiangran on 2016/7/2
 * homepage：http://www.laixiangran.cn
 * 视频播放器组件类
 */

import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
	selector: 'essence-ion-videoplayer',
	templateUrl: './essence-ion-videoplayer.component.html',
	styleUrls: ['./essence-ion-videoplayer.component.scss']
})
export class EssenceIonVideoplayerComponent implements OnInit {

	@ViewChild('videoToolbar') videoToolbar: ElementRef;

	@Input() width: number = 0;
	@Input() height: number = 0;
	@Input() source: string;
	@Input() poster: string;

	@Output() ready: EventEmitter<any> = new EventEmitter<any>(false);
	@Output() videoPlay: EventEmitter<any> = new EventEmitter<any>(false);
	@Output() videoPause: EventEmitter<any> = new EventEmitter<any>(false);
	@Output() videoEnded: EventEmitter<any> = new EventEmitter<any>(false);
	@Output() videoPan: EventEmitter<any> = new EventEmitter<any>(false);
	@Output() videoError: EventEmitter<any> = new EventEmitter<any>(false);

	videoElem: HTMLVideoElement; // video元素
	videoUrl: SafeResourceUrl; // 视频路径
	play_progress: number = 0; // 播放的进度条长度值
	canPlay: boolean = true; // false：加载中，true：可以播放
	coefficient: number = 1; // 快进/退系数
	isPan: boolean = false; // 视频是否在快进/退
	prevPoint: any; // 上次快进/退屏幕点位置

	constructor(public domSanitizer: DomSanitizer) {
	}

	ngOnInit() {
		this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.source);
		this.ready.emit(this);
	}

	/**
	 * 当浏览器已加载视频的元数据时
	 * @param e
	 */
	onLoadedmetadata(e: any) {
		this.videoElem = e.target as HTMLVideoElement;
	}

	/**
	 * 当浏览器可以播放视频时
	 * @param e
	 */
	onCanPlay(e: any) {
		this.canPlay = true;
	}

	/**
	 * 当视频已开始或不再暂停时
	 * @param e
	 */
	onPlay(e: any) {
		this.videoPlay.emit(e);
	}

	/**
	 * 当视频已经暂停时
	 * @param e
	 */
	onPause(e: any) {
		this.videoPause.emit(e);
	}

	/**
	 * 当视频在已因缓冲而暂停或停止后已就绪时
	 * @param e
	 */
	onPlaying(e: any) {
		this.canPlay = false;
	}

	/**
	 * 当视频由于需要缓冲下一帧而停止
	 * @param e
	 */
	onWaiting(e: any) {
		this.canPlay = false;
	}

	/**
	 * 当目前的播放列表已结束时
	 * @param e
	 */
	onEnded(e: any) {
		this.videoEnded.emit(e);
	}

	/**
	 * 当目前的播放位置已更改时
	 * @param e
	 */
	onTimeupdate(e: any) {
		this.canPlay = true;
		this.caleProgress();
	}

	/**
	 * 重新计算播放进度，修改当前时间及进度条
	 */
	caleProgress() {
		if (this.videoElem) {
			this.play_progress = this.videoElem.currentTime / this.videoElem.duration * this.videoToolbar.nativeElement.clientWidth;
		}
	}

	/**
	 * 当浏览器正在下载视频时
	 * @param e
	 */
	onProgress(e: any) {
	}

	/**
	 * 当浏览器可在不因缓冲而停顿的情况下进行播放时
	 * @param e
	 */
	onCanplaythrough(e: any) {
	}

	/**
	 * 返回表示视频错误状态的 MediaError 对象
	 * @param e
	 */
	onError(e: any) {
		this.videoError.emit(e);
	}

	/**
	 * video滑动事件
	 * @param e
	 */
	onPan(e: any) {
		this.isPan = true;
		this.pause();
		if (this.prevPoint) {
			const deltaX: number = e.deltaX - this.prevPoint.deltaX;
			this.videoElem.currentTime += (this.coefficient * deltaX);
			if (this.videoElem.currentTime > 0 && this.videoElem.currentTime < this.videoElem.duration) {
				this.caleProgress();
			}
		}
		if (e.isFinal) {
			this.prevPoint = null;
			this.isPan = false;
			this.canPlay = true;
			this.play();
		} else {
			this.prevPoint = e;
		}
		this.videoPan.emit(e);
	}

	/**
	 * 播放视频
	 */
	play() {
		if (this.videoElem.ended) {
			this.videoElem.currentTime = 0;
		}
		this.videoElem.play();
	}

	/**
	 * 暂停视频
	 */
	pause() {
		this.videoElem.pause();
	}

	/**
	 * 播放/暂停
	 */
	playOrPause() {
		if (this.videoElem) {
			this.videoElem.paused ? this.play() : this.pause();
		}
	}

	/**
	 * 重新加载video元素
	 */
	reload(videoElem: HTMLVideoElement) {
		this.canPlay = false;
		const id: any = setTimeout(() => {
			this.canPlay = true;
			videoElem.load();
			clearTimeout(id);
		}, 1000);
	}

	/**
	 * 将数字格式化成hh:mm:ss时间格式
	 * @param value
	 */
	getFormatTime(value: number): string {
		if (value) {
			const h: string = parseInt(value / 3600 + '', 10) < 10 ? '0' + parseInt(value / 3600 + '', 10) : '' + parseInt(value / 3600 + '', 10),
				m: string = parseInt(value % 3600 / 60 + '', 10) < 10 ? '0' + parseInt(value % 3600 / 60 + '', 10) : '' + parseInt(value % 3600 / 60 + '', 10);
			let s: string;
			if (value >= 60) {
				s = value % 3600 % 60 < 10 ? '0' + parseInt(value % 3600 % 60 + '', 10) : '' + parseInt(value % 3600 % 60 + '', 10);
			} else if (value < 60 && value >= 10) {
				s = '' + parseInt(value + '', 10);
			} else if (value < 10) {
				s = '0' + parseInt(value + '', 10);
			}
			return `${h}:${m}:${s}`;
		} else {
			return '00:00:00';
		}
	}
}
