/**
 * Created by laixiangran on 2016/8/7.
 * homepage：http://www.laixiangran.cn
 * Transform coordinate between earth(WGS-84) and mars in china(GCJ-02).
 * 地理坐标(WGS-84)、火星坐标(GCJ-02)互转服务
 */

import { Injectable } from '@angular/core';

export interface LngLat {
	lng: number,
	lat: number
}

@Injectable()
export class TransformService {

	private earthR = 6378137.0; // 地球半径

	constructor() {}

	/**
	 * 是否超出中国范围
	 * @param {number} lng
	 * @param {number} lat
	 * @returns {boolean}
	 */
	private outOfChina(lng: number, lat: number): boolean {
		return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271;
	}

	private transform(x: number, y: number): LngLat {
		const xy = x * y,
			absX = Math.sqrt(Math.abs(x)),
			xPi = x * Math.PI,
			yPi = y * Math.PI,
			d = 20.0 * Math.sin(6.0 * xPi) + 20.0 * Math.sin(2.0 * xPi);
		let lat = d,
			lng = d;
		lat += 20.0 * Math.sin(yPi) + 40.0 * Math.sin(yPi / 3.0);
		lng += 20.0 * Math.sin(xPi) + 40.0 * Math.sin(xPi / 3.0);
		lat += 160.0 * Math.sin(yPi / 12.0) + 320 * Math.sin(yPi / 30.0);
		lng += 150.0 * Math.sin(xPi / 12.0) + 300.0 * Math.sin(xPi / 30.0);
		lat *= 2.0 / 3.0;
		lng *= 2.0 / 3.0;
		lat += -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * xy + 0.2 * absX;
		lng += 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * xy + 0.1 * absX;
		return {lat: lat, lng: lng}
	}

	private delta(lng: number, lat: number): LngLat {
		const ee = 0.00669342162296594323,
			d = this.transform(lng - 105.0, lat - 35.0),
			radLat = lat / 180.0 * Math.PI;
		let magic = Math.sin(radLat);
		magic = 1 - ee * magic * magic;
		const sqrtMagic = Math.sqrt(magic);
		d.lat = (d.lat * 180.0) / ((this.earthR * (1 - ee)) / (magic * sqrtMagic) * Math.PI);
		d.lng = (d.lng * 180.0) / (this.earthR / sqrtMagic * Math.cos(radLat) * Math.PI);
		return d;
	}

	/**
	 * 地理坐标(WGS-84)转火星坐标(GCJ-02)
	 * @param {number} wgsLng 经度
	 * @param {number} wgsLat 纬度
	 * @returns {LngLat}
	 */
	wgs2gcj(wgsLng: number, wgsLat: number): LngLat {
		if (this.outOfChina(wgsLng, wgsLat)) {
			return {lng: wgsLng, lat: wgsLat};
		}
		const d = this.delta(wgsLng, wgsLat);
		return {lng: wgsLng + d.lng, lat: wgsLat + d.lat};
	}

	/**
	 * 火星坐标(GCJ-02)转地理坐标(WGS-84)
	 * @param {number} gcjLng 经度
	 * @param {number} gcjLat 纬度
	 * @returns {LngLat}
	 */
	gcj2wgs(gcjLng: number, gcjLat: number): LngLat {
		if (this.outOfChina(gcjLng, gcjLat)) {
			return {lng: gcjLng, lat: gcjLat};
		}
		const d = this.delta(gcjLng, gcjLat);
		return {lng: gcjLng - d.lng, lat: gcjLat - d.lat};
	}
}
