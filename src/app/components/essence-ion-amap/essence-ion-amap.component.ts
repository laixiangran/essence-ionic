/**
 * Created by laixiangran on 2016/7/2
 * homepage：http://www.laixiangran.cn
 * 高德地图组件类
 */

declare let AMap: any;

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { TransformService } from './services/transform.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
	selector: 'essence-ion-amap',
	templateUrl: './essence-ion-amap.component.html',
	providers: [TransformService]
})
export class EssenceIonAMapComponent implements OnInit, OnDestroy {
	@ViewChild('amap') elRef: ElementRef;
	map: any;
	convertAPI: string;
	AMapAPI: string;
	tempLocation: any = null;
	locationMarker: any;
	locationZoom: number = 16;
	isStartLocation: boolean = false;
	trafficTileLayer: any;
	isShowTraffic: boolean = false;
	initZoom: number;
	initCenter: any;
	vertrefresh: number = 10;
	eAMap: any = window['AMap'];

	@Input() options: Object;
	@Input() isShowMapToolbar: boolean = true;
	@Input() showCurrentLocation: boolean = false;
	@Input() showLocationMarker: boolean = true;
	@Input()
	set showTraffic(value: boolean) {
		this.isShowTraffic = value;
		if (value) {
			if (this.trafficTileLayer) {
				this.trafficTileLayer.show();
			}
		} else {
			if (this.trafficTileLayer) {
				this.trafficTileLayer.hide();
			}
		}
	};
	@Input()
	set webApiKey(value: string) {
		this.convertAPI = `http://restapi.amap.com/v3/assistant/coordinate/convert?key=${value}`;
	};
	@Input()
	set apiKey(value: string) {
		this.AMapAPI = `http://webapi.amap.com/maps?v=1.3&key=${value}`;
	};
	@Output() ready: EventEmitter<any> = new EventEmitter<any>(false);
	@Output() destroy: EventEmitter<any> = new EventEmitter<any>(false);
	@Output() location: EventEmitter<any> = new EventEmitter<any>(false);

	constructor(public http: HttpClient,
				public transformService: TransformService) {}

	ngOnInit() {
		this.initMap();
	}

	ngOnDestroy() {
		if (this.map) {
			this.map.destroy();
		}
		this.destroy.emit('amap is destroy!');
	}

	/**
	 * 初始化地图
	 */
	initMap() {
		this.map = new this.eAMap.Map(this.elRef.nativeElement, this.options);
		this.trafficTileLayer = new this.eAMap.TileLayer.Traffic({
			map: this.map,
			autoRefresh: true,
			interval: this.vertrefresh
		});
		if (this.isShowTraffic) {
			this.trafficTileLayer.show();
		} else {
			this.trafficTileLayer.hide();
		}
		if (this.showCurrentLocation) {
			this.currentLocation();
		}
		this.initZoom = this.map.getZoom();
		this.initCenter = this.map.getCenter();
		this.map.on('complete', () => {
			this.ready.emit(this);
		});
	}

	/**
	 * 动态添加高德地图api
	 * @returns {Promise<any>}
	 */
	addAmapScript(): Promise<any> {
		return new Promise((resolve, reject) => {
			const head = document.getElementsByTagName('head')[0],
				script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = this.AMapAPI;
			head.appendChild(script);
			script.onload = () => {
				resolve();
			};
			script.onerror = (err: any) => {
				reject(err);
			}
		});
	}

	/**
	 * 设置地图中心
	 * @param position
	 */
	setCenter(position: number[]) {
		this.map.setZoomAndCenter(this.initZoom, position);
		this.initZoom = this.map.getZoom();
		this.initCenter = this.map.getCenter();
	}

	/**
	 * 设置地图范围
	 * @param {number[]} southWest
	 * @param {number[]} northEast
	 * @memberof EssenceNg2AMapComponent
	 */
	setBounds(southWest: number[], northEast: number[]) {
		const bounds: any = new this.eAMap.Bounds(southWest, northEast)
		this.map.setBounds(bounds);
		this.initZoom = this.map.getZoom();
		this.initCenter = this.map.getCenter();
	}

	/**
	 * 创建覆盖物
	 * @param markerOptions
	 * @returns {AMap.Marker}
	 */
	createMarker(markerOptions: any): any {
		return new this.eAMap.Marker(markerOptions);
	}

	/**
	 * 创建点标记的图标
	 * @param iconOptions
	 * @returns {AMap.Icon}
	 */
	creatIcon(iconOptions: any): any {
		return new this.eAMap.Icon(iconOptions);
	}

	creatPixel(x: Number, y: Number): any {
		return new this.eAMap.Pixel(x, y);
	}

	/**
	 * 创建地物对象的像素尺寸
	 * @param width
	 * @param height
	 * @returns {AMap.Size}
	 */
	creatSize(width: number, height: number): any {
		return new this.eAMap.Size(width, height);
	}

	/**
	 * 获取地图对象
	 * @returns {any}
	 */
	getMap() {
		return this.map;
	}

	/**
	 * GPS或者百度坐标转为高德坐标
	 * @param coordArr [{x: number, y: number}]
	 * @param coordsys 'gps' or 'baidu'
	 * @returns {Observable<any>}
	 */
	fromGPSOrBAIDU(coordArr: Array<Object>, coordsys: string = 'gps'): Observable<any> {
		let url = this.convertAPI + '&coordsys=' + coordsys + '&locations=';
		url += this.coordArrToString(coordArr);
		return this.getCoord(url);
	}

	/**
	 * 设置为初始范围
	 */
	fullMap() {
		this.initParams();
		this.map.setZoomAndCenter(this.initZoom, this.initCenter);
	}

	/**
	 * 根据是否存在this.locationMarker进行初始化参数
	 * @returns {boolean}
	 */
	initParams(): boolean {
		if (this.locationMarker) {
			this.map.remove([this.locationMarker]);
			this.locationMarker = null;
			this.tempLocation = null;
			this.location.emit({
				code: 'cancle',
				info: '取消定位',
				result: this.tempLocation
			});
			return false;
		} else {
			return true;
		}
	}

	/**
	 * 定位
	 */
	currentLocation(): void {
		if (this.initParams()) {
			this.isStartLocation = true;
			this.getCurrentPosition().then(() => {
				this.isStartLocation = false;
			});
		}
	}

	getCurrentPosition(): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			const options: PositionOptions = {
				enableHighAccuracy: true,  // 是否使用 GPS
				maximumAge: 30000,         // 缓存时间
				timeout: 27000            // 超时时间
			};
			navigator.geolocation.getCurrentPosition((position: Position) => {
				const currLocation: any = this.transformService.gcj2wgs(position.coords.longitude, position.coords.latitude);
				this.tempLocation = {
					x: currLocation.lng,
					y: currLocation.lat
				};
				this.fromGPSOrBAIDU([this.tempLocation]).subscribe((data: any) => {
					const aPosition: any[] = data.locations.split(',');
					this.map.setZoomAndCenter(this.locationZoom, aPosition);
					if (this.showLocationMarker) {
						this.locationMarker = this.createMarker({
							// icon: this.creatIcon({
							//     image: './assets/img/map/loc.png'
							// }),
							position: aPosition
						});
						this.locationMarker.setMap(this.map);
					}
					this.location.emit({
						code: 'ok',
						info: '定位成功',
						result: this.tempLocation
					});
					resolve();
				});
			}, (error: PositionError) => {
				this.location.emit({
					code: 'error',
					info: '定位失败',
					result: error
				});
				reject();
			}, options);
		});
	}

	/**
	 * 坐标数组转换成字符串
	 * @param coordArr
	 * @returns {string}
	 */
	private coordArrToString(coordArr: Array<Object>): string {
		let coordStr = '';
		coordArr.forEach((coord: any, index: number) => {
			coordStr += (coord.POINT_X || coord.x) + ',' + (coord.POINT_Y || coord.y) + ';';
		});
		return coordStr;
	}

	/**
	 * 获取转换结果
	 * @param url
	 * @returns {Observable<any>}
	 */
	private getCoord(url: string): Observable<any> {
		const headers: HttpHeaders = new HttpHeaders({
			'Content-Type': 'application/json'
		}), options = {headers: headers};
		return this.http.get(url, options).catch((error: HttpErrorResponse) => {
			return Observable.throw(error || 'Server Error');
		});
	}
}




