import { Dayjs } from "dayjs"
import dayjs from 'dayjs'
/**
 * 睡眠指定时间
 * @param delay 睡眠时间，单位毫秒
 * @returns 一个Promise对象，在指定时间后resolve
 */
export function sleep(delay: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, delay)
    })
}

/** 该方法用于生成带毫秒级别的倒计时 eg.13:20:21.5 */
export function getDateDiffWithMsec(date1: Date | Dayjs, date2 = new Date()) {
	const ret = {
		msecs: 0,
		seconds: 0,
		minutes: 0,
		hours: 0
	} as {
        msecs: number,
        seconds: number,
        minutes: number,
        hours: number
    }
	let diff: number = dayjs(date1).diff(dayjs(date2))
	if(diff > 0) {
		const time = diff / 1000
		ret.hours = Math.floor((time % (60 * 60 * 24)) / 3600);
		ret.minutes = Math.floor(((time % (60 * 60 * 24)) % 3600) / 60);
		ret.seconds = Math.floor(((time % (60 * 60 * 24)) % 3600) % 60);
		ret.msecs = Math.floor(((diff % (60 * 60 * 24)) % 3600) / 60) % 10;
	}
	return ret
}