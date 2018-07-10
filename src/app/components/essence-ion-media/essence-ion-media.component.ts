/**
 * Created by laixiangran on 2016/7/2
 * homepage：http://www.laixiangran.cn
 * 媒体文件上传和查看组件
 */

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Media } from './models/media.model';
import { ActionSheetController } from 'ionic-angular';
import { CaptureImageOptions, MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

@Component({
	selector: 'essence-ion-media',
	templateUrl: './essence-ion-media.component.html'
})
export class EssenceIonMediaComponent implements OnInit {
	@ViewChild('essenceIonMedia') essenceIonMediaDiv: ElementRef;
	@ViewChild('addLi') addLi: ElementRef;
	fixLis: any[] = [];
	medias: Media[] = [];

	constructor(public actionSheetCtrl: ActionSheetController,
				public imagePicker: ImagePicker,
				public mediaCapture: MediaCapture) {
	}

	ngOnInit() {

		// 计算出需要补充多少个 class 为 fix 的 li
		const len: number = Math.floor(this.essenceIonMediaDiv.nativeElement.offsetWidth / this.addLi.nativeElement.offsetWidth);
		for (let i: number = 0; i < len; i++) {
			this.fixLis.push(i);
		}
	}

	/**
	 * 添加媒体文件
	 */
	addMedia() {
		const actionSheet = this.actionSheetCtrl.create({
			buttons: [
				{
					text: '拍摄照片',
					handler: () => {
						this.captureImage().then((urls: string[]) => {
							urls.forEach((url: string) => {
								this.medias.push({url: url});
							});
						});
					}
				}, {
					text: '从相册选择',
					handler: () => {
						this.pickerImage().then((urls: string[]) => {
							urls.forEach((url: string) => {
								this.medias.push({url: url});
							});
						});
					}
				}, {
					text: '取消',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}
			]
		});
		actionSheet.present();
	}

	/**
	 * 拍摄照片
	 */
	captureImage(): Promise<any> {
		const options: CaptureImageOptions = {limit: 1};
		return this.mediaCapture.captureImage(options).then((data: MediaFile[]) => {
			if (data) {
				return data.map((file: MediaFile) => {
					return file.fullPath;
				});
			} else {
				return [];
			}
		}, (err: CaptureError) => {
			console.error(err);
			return [];
		});
	}

	/**
	 * 从相册选择照片
	 */
	pickerImage(): Promise<any> {
		const options: ImagePickerOptions = {
			maximumImagesCount: 1
		};
		return this.imagePicker.getPictures(options).then((data: string[]) => {
			return data || [];
		}, (err: any) => {
			console.error(err);
			return [];
		});
	}
}




