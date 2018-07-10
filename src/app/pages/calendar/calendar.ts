/**
 * Created by laixiangran on 2016/8/6.
 * homepage：http://www.laixiangran.cn
 */

import { Component } from '@angular/core';
import { EssenceIonCalendarComponent, Schedule } from '../../components';

@Component({
	selector: 'page-calendar',
	templateUrl: 'calendar.html'
})
export class CalendarPage {

	schedules: Schedule[];

	constructor() {
		this.schedules = [
			{
				date: new Date(2017, 8, 1),
				data: {
					title: '参加会议',
					address: '公司会议室',
					content: '讨论考核制度',
					info: '参会人员包括：张三、李四'
				}
			},
			{
				date: new Date(2017, 7, 10),
				data: {
					title: '参加会议',
					address: '公司会议室',
					content: '讨论考核制度',
					info: '参会人员包括：张三、李四'
				}
			},
			{
				date: new Date(),
				data: {
					title: '参加会议',
					address: '公司会议室',
					content: '讨论考核制度',
					info: '参会人员包括：张三、李四'
				}
			}
		]
	}

	onReady($event: EssenceIonCalendarComponent) {
		console.log('日历组件加载完成！', $event);
	}

	onDateChange($event: Date) {
		console.log($event);
	}

	onViewSchedule($event: any) {
		console.log($event);
	}
}
