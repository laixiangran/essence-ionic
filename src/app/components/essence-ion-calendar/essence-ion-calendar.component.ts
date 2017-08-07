/**
 * Created by laixiangran on 2016/7/2
 * homepage：http://www.laixiangran.cn
 * 日历组件类
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'essence-ion-calendar',
	templateUrl: './essence-ion-calendar.component.html',
	styleUrls: ['./essence-ion-calendar.component.scss']
})
export class EssenceIonCalendarComponent implements OnInit {

	now: Date; // 当前选择的日期
	currentDate: string;
	calendarData: any; // 初始化的日历数据
	minYear: number = 1899; // 最小年限
	maxYear: number = 2050; // 最大年限
	weekData: Array<string> = ['日', '一', '二', '三', '四', '五', '六']; // 星期数据
	initSchedules: Array<{date: Date, data: any}> = null;

	@Input()
	set schedules(schedules: Array<{date: Date, data: any}>) {
		if (schedules) {
			this.initSchedules = schedules;
			this.caleCurrentDate(new Date());
			this.initCalendarData(new Date(), !!schedules);
		}
	}

	@Output() ready: EventEmitter<any> = new EventEmitter<any>(false);
	@Output() dateChange: EventEmitter<any> = new EventEmitter<any>(false);
	@Output() ViewData: EventEmitter<any> = new EventEmitter<any>(false);
	// 错误码列表
	errorCode = {
		'100': '输入的年份超过了可查询范围，仅支持1900至2050年',
		'101': '参数输入错误，请查阅文档'
	};

	constructor() {
	}

	ngOnInit() {
		if (!this.initSchedules) {
			this.caleCurrentDate(new Date());
			this.initCalendarData(new Date(), true);
		}
	}

	/**
	 * 计算当前日期
	 * @param {Date} date
	 */
	caleCurrentDate(date: Date) {
		const month: number = date.getMonth() + 1;
		const monthStr: string = month > 10 ? month + '' : '0' + month;
		this.currentDate = date.getFullYear() + '-' + monthStr;
	}


	/**
	 * 返回今天
	 */
	backToday() {
		this.caleCurrentDate(new Date());
	}

	/**
	 * 日期改变事件
	 */
	datetimeChange() {
		this.initCalendarData(new Date(this.currentDate));
	}

	/**
	 * 查看日程详情
	 * @param data
	 */
	onViewData(data: any) {
		if (data) {
			this.ViewData.emit(data);
		}
	}

	/**
	 * 初始化日历
	 * @param {Date} now 当前选择日期
	 * @param {boolean} isFirst 是否第一次初始化日历
	 */
	initCalendarData(now: Date, isFirst: boolean = false) {
		this.now = now;
		this.calendarData = this.solarCalendar(this.now.getFullYear(), this.now.getMonth());
		// 设置对应日期的日程安排
		if (this.initSchedules) {
			this.calendarData.monthData.forEach((monthData: any) => {
				this.initSchedules.forEach((schedule: any) => {
					schedule.date = new Date(schedule.date);
					if (schedule.date.toString() !== 'Invalid Date') {
						const date1: Date = new Date(monthData.year, monthData.month - 1, monthData.day),
							date2: Date = new Date(schedule.date.getFullYear(), schedule.date.getMonth(), schedule.date.getDate());
						if (date1.getTime() === date2.getTime()) {
							monthData.data = schedule.data;
						}
					} else {
						throw new Error('schedules date is Invalid Date!');
					}
				});
			});
		}
		if (isFirst) {
			this.ready.emit(this);
		} else {
			this.dateChange.emit(this.now);
		}
	}

	/**
	 * 公历某月日历
	 * @param {Number} year 公历年
	 * @param {Number} month 公历月
	 * @param {Boolean} fill 是否用上下月数据补齐首尾空缺，首例数据从周日开始 (7*6阵列)
	 * @returns {Object}
	 */
	solarCalendar(year: number, month: number, fill: boolean = true): any {
		const inputDate: any = this.formateDate(year, month);
		if (inputDate.error) {
			return inputDate;
		}
		const _year: number = inputDate.year,
			_month: number = inputDate.month,
			firstDate = new Date(_year, _month, 1),
			res: any = {
				firstDay: firstDate.getDay(), // 该月1号星期几
				monthDays: this.getSolarMonthDays(_year, _month), // 该月天数
				monthData: []
			};
		let preMonthDays: number,
			preMonthData: Array<any>,
			nextMonthData: Array<any>;
		res.monthData = this.creatLenArr(_year, _month + 1, res.monthDays, 1);
		if (fill) {
			if (res.firstDay > 0) { // 前补
				const preYear: number = _month - 1 < 0 ? _year - 1 : _year,
					preMonth: number = _month - 1 < 0 ? 11 : _month - 1;
				preMonthDays = this.getSolarMonthDays(preYear, preMonth);
				preMonthData = this.creatLenArr(preYear, preMonth + 1, res.firstDay, preMonthDays - res.firstDay + 1);
				res.monthData = preMonthData.concat(res.monthData);
			}
			if (7 * 6 - res.monthData.length !== 0) { // 后补
				const nextYear: number = _month + 1 > 11 ? _year + 1 : _year,
					nextMonth: number = _month + 1 > 11 ? 0 : _month + 1,
					fillLen: number = 7 * 6 - res.monthData.length;
				nextMonthData = this.creatLenArr(nextYear, nextMonth + 1, fillLen, 1);
				res.monthData = res.monthData.concat(nextMonthData);
			}
		}
		return res;
	}

	/**
	 * 创建指定年月的天数
	 * @param year 年
	 * @param month 月
	 * @param len 天数
	 * @param start 哪一天开始
	 * @returns {Array}
	 */
	creatLenArr(year: number, month: number, len: number, start: number = 0): Array<any> {
		const arr: Array<any> = [];
		if (len < 1) {
			return arr;
		}
		let k: number = start;
		for (let i: number = 0; i < len; i++) {
			arr.push({
				year: year,
				month: month,
				day: k
			});
			k++;
		}
		return arr;
	}

	/**
	 * 统一日期输入参数（月份统一从0开始）
	 * @param year 公历年
	 * @param month 公历月
	 * @param day 公历日
	 * @param minYear 最小公历年
	 * @returns {any}
	 */
	formateDate(year?: number, month?: number, day?: number, minYear?: number): any {
		const now: Date = new Date();
		year = year ? year : now.getFullYear();
		month = !isNaN(month + 1) ? month : now.getMonth();
		day = day ? day : now.getDate();
		if (year < (minYear ? minYear : this.minYear + 1) || year > this.maxYear) {
			return {
				error: 100,
				msg: this.errorCode[100]
			};
		}
		return {
			year: year,
			month: month,
			day: day
		};
	}

	/**
	 * 获取公历月份的天数
	 * @param {Number} year 公历年
	 * @param {Number} month 公历月
	 * @returns {number}
	 */
	getSolarMonthDays(year: number, month: number): number {
		const monthDays: Array<number> = [31, this.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		return monthDays[month];
	}

	/**
	 * 判断公历年是否是闰年
	 * @param {Number} year 公历年
	 * @returns {boolean}
	 */
	isLeapYear(year: number): boolean {
		return ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0));
	}

	/**
	 * 判断指定的月与当前月是否相同
	 * @param year
	 * @param month
	 * @param day
	 * @returns {boolean}
	 */
	isNotSameMonth(year?: number, month?: number, day?: number): boolean {
		const date1: Date = new Date(year, month - 1, 1),
			date2: Date = new Date(this.now.getFullYear(), this.now.getMonth(), 1);
		return date1.getTime() !== date2.getTime();
	}

	/**
	 * 判断是否是今天
	 * @param year
	 * @param month
	 * @param day
	 * @returns {boolean}
	 */
	isCurrDay(year?: number, month?: number, day?: number): boolean {
		const now: Date = new Date(),
			date1: Date = new Date(year, month - 1, day),
			date2: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		return date1.getTime() === date2.getTime();
	}
}




