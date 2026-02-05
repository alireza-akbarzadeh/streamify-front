import {
	formatDistanceToNow as DateF,
	type FormatDistanceToNowOptions,
	isToday,
	isYesterday,
} from "date-fns";

export const formatDistanceToNow = (
	dateStr: string,
	option?: FormatDistanceToNowOptions,
): string => {
	const date = new Date(dateStr);

	if (isToday(date)) return "Today";
	if (isYesterday(date)) return "Yesterday";

	return DateF(date, option);
};
