/**
 * Created by laixiangran on 2018/7/10.
 * homepage：http://www.laixiangran.cn.
 * 日常信息model
 */

export class Schedule {

	/**
	 * 日程日期
	 */
	date: Date;

	/**
	 * 日程信息
	 */
	data: {
		title: string, // 标题
		address: string, // 地址
		content: string, // 内容
		info: string // 备注
	};
}
