package xialinHub.com.util.tool;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

/**
 * 
 * @Title: DateUtil.java
 * @Description:时间处理
 * @author Wangchaoyong
 * @date 上午11:25:53
 * @version V1.0
 */
public class DateUtil {
	public static final long DATE_BASE = 946828800000l;// 基础时间 取 2000-01-03
	// 00:00:00 星期1
	/**
	 * 默认的时间戳格式:{@value}
	 */
	public static final String TIMESTAMPFORMAT = "yyyy-MM-dd HH:mm:ss";
	public static final String DATE_FORMAR_STRING = "yyyy-MM-dd";// 时间格式化字符串
	public static final String DATE_MM_DD_FORMAR_STRING = "MM月dd日";// 时间格式化字符串
	public static final String DATETIME_FORMAR_STRING = "yyyy-MM-dd HH:mm:ss";// 时间格式化字符串
	public static final String TIME_FORMAR_STRING = "HH:mm:ss";// 时间格式化字符串
	public static final String DATE_NOLINE_STRING = "yyyyMMdd";// 时间格式化字符串
	public static final String DATE_YEAL_MM_DD_STRING = "yyyy年MM月dd日HH:mm";// 时间格式化字符串

	public static final SimpleDateFormat dateFormat = new SimpleDateFormat(DATE_FORMAR_STRING);
	public static final SimpleDateFormat datetimeFormat = new SimpleDateFormat(DATETIME_FORMAR_STRING);
	public static final SimpleDateFormat timeFormat = new SimpleDateFormat(TIME_FORMAR_STRING);
	public static final SimpleDateFormat timeFormatMD = new SimpleDateFormat(DATE_MM_DD_FORMAR_STRING);
	public static final SimpleDateFormat dateNoLineFormat = new SimpleDateFormat(DATE_NOLINE_STRING);
	public static final SimpleDateFormat dateFormatYMD = new SimpleDateFormat(DATE_YEAL_MM_DD_STRING);

	/**
	 * 时间类型转换为字符串 yyyy年MM月dd日HH:mm
	 * 
	 * @param date
	 * @return String
	 */
	public static String formatDateYMD(Date date) {
		if (date == null) {
			return "";
		} else {
			return dateFormatYMD.format(date);
		}
	}

	/**
	 * 时间类型转换为字符串 yyyyMMdd
	 * 
	 * @param date
	 * @return String
	 */
	public static String formatNoLineDate(Date date) {
		if (date == null) {
			return "";
		} else {
			return dateNoLineFormat.format(date);
		}
	}

	public static String formatDate(Date date, String format) {
		if (date == null) {
			return "";
		} else {
			return new SimpleDateFormat(format).format(date);
		}
	}

	/**
	 * 时间类型转换为字符串 yyyy-MM-dd
	 * 
	 * @param date
	 * @return String
	 */
	public static String formatDate(Date date) {
		if (date == null) {
			return "";
		} else {
			return dateFormat.format(date);
		}
	}

	/**
	 * 时间类型转换为字符串 MM月dd日
	 * 
	 * @param date
	 * @return String
	 */
	public static String formatDateMD(Date date) {
		if (date == null) {
			return "";
		} else {
			return timeFormatMD.format(date);
		}
	}

	/**
	 * 时间类型转换为字符串 yyyy-MM-dd HH:mm:ss
	 * 
	 * @param date
	 * @return String
	 */
	public static String formatDateTime(Date date) {
		if (date == null) {
			return "";
		} else {
			return datetimeFormat.format(date);
		}
	}

	/**
	 * 时间类型转换为字符串 HH:mm:ss
	 * 
	 * @param date
	 * @return String
	 */
	public static String formatTime(Date date) {
		if (date == null) {
			return "";
		} else {
			return timeFormat.format(date);
		}
	}

	/**
	 * @yhcip:title 得到当前处在当年的第几周
	 * @yhcip:desc 得到当前处在当年的第几周
	 * @return 如18，表示现在是第18周
	 * @author Administrator
	 */
	public static int getWeekOfYear() {
		Calendar oneCalendar = Calendar.getInstance();
		return oneCalendar.get(Calendar.WEEK_OF_YEAR);
	}

	/**
	 * @yhcip:title 得到当前是第几月
	 * @yhcip:desc 得到当前是第几月
	 * @return 如4，表示现在是4月
	 * @author Administrator
	 */
	public static int getMonth() {
		Calendar oneCalendar = Calendar.getInstance();
		return oneCalendar.get(Calendar.MONTH) + 1;
	}

	/**
	 * 时间转换
	 * 
	 * @param date
	 *            时间
	 * @param format
	 *            格式
	 * @return String
	 */
	public static String format(Date date, String format) {
		if (date == null) {
			return "";
		} else {
			SimpleDateFormat dateFormat = new SimpleDateFormat(format);
			return dateFormat.format(date);
		}

	}

	/**
	 * 字符串转换成时间类型 转换后的时间格式 yyyy-MM-dd
	 * 
	 * @param dateString
	 * @return Date
	 * @throws ParseException
	 */
	public static Date parseDate(String dateString) throws ParseException {
		return dateFormat.parse(dateString);
	}

	/**
	 * 字符串转换成时间类型 转换后的时间格式 HH:mm:ss
	 * 
	 * @param dateString
	 * @return Date
	 * @throws ParseException
	 */
	public static Date parseTime(String dateString) throws ParseException {
		return timeFormat.parse(dateString);
	}

	/**
	 * 字符串转换成时间类型 转换后的时间格式 yyyy-MM-dd HH:mm:ss
	 * 
	 * @param dateString
	 * @return Date
	 * @throws ParseException
	 */
	public static Date parseDateTime(String dateString) throws ParseException {
		return datetimeFormat.parse(dateString);
	}

	/**
	 * 字符串转换成时间类型
	 * 
	 * @param dateString
	 *            时间
	 * @param format
	 *            格式
	 * @return Date
	 * @throws ParseException
	 */
	public static Date parse(String dateString, String format) throws ParseException {
		SimpleDateFormat dateFormat = new SimpleDateFormat(format);
		return dateFormat.parse(dateString);
	}

	/**
	 * 通过传入时间与当前时间比较，获得时间差值形成文字
	 * 
	 * @param date
	 *            传入时间
	 * @return 串
	 */
	public static String getStringForDate(Date date) {

		String result = "";
		Calendar inputdate = Calendar.getInstance();
		inputdate.setTime(date);
		Calendar now = Calendar.getInstance();

		if (now.get(Calendar.YEAR) == inputdate.get(Calendar.YEAR) && now.get(Calendar.MONTH) == inputdate.get(Calendar.MONTH)) {
			int day = now.get(Calendar.DATE) - inputdate.get(Calendar.DATE);
			switch (day) {
			case 0:
				break;
			case 1:
				result = "昨天";
				break;
			default:
				result = format(inputdate.getTime(), "yyyy年MM月dd日");
				break;
			}
			result = result + format(inputdate.getTime(), "HH:mm");
		} else {
			result = format(inputdate.getTime(), "yyyy年MM月dd日HH:mm");

		}

		return result;
	}

	/**
	 * 通过传入时间与当前时间比较，获得时间差值形成文字(简易)
	 * 
	 * @param date
	 *            传入时间
	 * @return String
	 */
	public static String getSimpleStringForDate(Date date) {
		String result = "";
		Calendar inputdate = Calendar.getInstance();
		inputdate.setTime(date);
		Calendar now = Calendar.getInstance();

		int day = now.get(Calendar.DATE) - inputdate.get(Calendar.DATE);
		switch (day) {
		case 0:
			result = format(inputdate.getTime(), "HH:mm");
			break;
		default:
			result = format(inputdate.getTime(), "yyyy-MM-dd");
			break;
		}

		return result;
	}

	/**
	 * 获得与当前系统时间的相差天数
	 * 
	 * @param date
	 * @return 相差天数 如果传入时间大于当前系统时间为负数
	 */
	public static long compareDate(long date) {
		long result = 0;
		long now = System.currentTimeMillis() - DateUtil.DATE_BASE;// 系统时间 -
		// 基数时间
		long inputdate = date - DateUtil.DATE_BASE;// 最后天数时间

		long day = 1000 * 3600 * 24;
		result = now / day - inputdate / day;
		return result;

	}

	/**
	 * 获得传入两个时间的相差天数
	 * 
	 * @param date
	 * @return 相差天数
	 */
	public static long compareDate(long startdate, long enddate) {
		long result = 0;
		long starttime = startdate - DateUtil.DATE_BASE;// 系统时间 -
		long endtime = enddate - DateUtil.DATE_BASE;// 最后天数时间

		long day = 1000 * 3600 * 24;
		result = endtime / day - starttime / day;
		return result;

	}

	/**
	 * 获得与当前系统时间的相差周数
	 * 
	 * @param date
	 * @return 相差周数 如果传入时间大于当前系统时间为负数
	 */
	public static long compareWeek(long date) {
		long result = 0;
		long now = System.currentTimeMillis() - DateUtil.DATE_BASE;// 系统时间 -
		// 基数时间
		long inputdate = date - DateUtil.DATE_BASE;// 最后天数时间

		long week = 1000 * 3600 * 24 * 7;
		result = now / week - inputdate / week;
		return result;
	}

	/**
	 * 获得与当前系统时间的相差月数
	 * 
	 * @param date
	 * @return 相差月数 如果传入时间大于当前系统时间为负数
	 * 
	 * @author 刘宇
	 * @date 2011-05-18
	 */
	public static long compareMonth(long date) {
		Calendar now = Calendar.getInstance();
		Calendar input = Calendar.getInstance();
		input.setTimeInMillis(date);
		int yearnow = now.get(Calendar.YEAR);
		int monthnow = now.get(Calendar.MONTH);
		int yearinput = input.get(Calendar.YEAR);
		int monthinput = input.get(Calendar.MONTH);
		return yearnow * 12 + monthnow - yearinput * 12 - monthinput;

	}

	/**
	 * 计算年龄
	 * 
	 * @param date
	 *            出生日期
	 * @return
	 */
	public static int calcAge(Date date) {
		if (date == null) {
			return 0;
		}
		Calendar now = Calendar.getInstance();
		int age = now.get(Calendar.YEAR);
		now.setTime(date);
		return age - now.get(Calendar.YEAR);
	}

	/**
	 * 根据传入时间 获得本周第一天（周一)的时间
	 * 
	 * @param date
	 * @return 返回时间 时分秒毫秒为0
	 */
	public static long getFristDayForWeek(long date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(date);
		int tempday = calendar.get(Calendar.DAY_OF_WEEK);
		switch (tempday) {
		case 1:
			// 星期天
			calendar.add(Calendar.DATE, -6);
			break;
		default:
			// 周一到周六
			calendar.add(Calendar.DATE, -(tempday - 2));
			break;
		}
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		return calendar.getTime().getTime();
	}

	/**
	 * 根据传入时间 获得本周第一天（周一)的时间
	 * 
	 * @return 返回时间 时分秒毫秒为0
	 */
	public static long getFristDayForWeek() {
		return getFristDayForWeek(System.currentTimeMillis());
	}

	/**
	 * 根据传入时间 获得本周最后一天（周日)的时间
	 * 
	 * @param date
	 * @return 返回时间 时分秒毫秒为23:59:59 999
	 */
	public static long getLastDayForWeek(long date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(date);
		int tempday = calendar.get(Calendar.DAY_OF_WEEK);
		switch (tempday) {
		case 1:
			// 星期天
			break;
		default:
			// 周一到周六
			calendar.add(Calendar.DATE, 8 - tempday);
			break;
		}
		calendar.set(Calendar.HOUR_OF_DAY, 23);
		calendar.set(Calendar.MINUTE, 59);
		calendar.set(Calendar.SECOND, 59);
		calendar.set(Calendar.MILLISECOND, 999);
		return calendar.getTime().getTime();
	}

	/**
	 * 根据传入时间 获得本周最后一天（周日)的时间
	 * 
	 * @return 返回时间 时分秒毫秒为23:59:59 999
	 */
	public static long getLastDayForWeek() {
		return getLastDayForWeek(System.currentTimeMillis());
	}

	/**
	 * 根据传入时间 获得此时间所在月的 第一天的日期
	 * 
	 * @param date
	 * @return
	 */
	public static Date getMonthFristDay(long date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(date);
		calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));
		calendar.set(Calendar.HOUR_OF_DAY, calendar.getActualMinimum(Calendar.HOUR));
		calendar.set(Calendar.MINUTE, calendar.getActualMinimum(Calendar.MINUTE));
		calendar.set(Calendar.SECOND, calendar.getActualMinimum(Calendar.SECOND));
		calendar.set(Calendar.MILLISECOND, calendar.getActualMinimum(Calendar.MILLISECOND));
		return calendar.getTime();
	}

	/**
	 * 根据传入时间 获得此时间所在月的 最后一天的日期
	 * 
	 * @param date
	 * @return
	 */
	public static Date getMonthLastDay(long date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(date);
		calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		calendar.set(Calendar.HOUR, calendar.getActualMaximum(Calendar.HOUR));
		calendar.set(Calendar.MINUTE, calendar.getActualMaximum(Calendar.MINUTE));
		calendar.set(Calendar.SECOND, calendar.getActualMaximum(Calendar.SECOND));
		calendar.set(Calendar.MILLISECOND, calendar.getActualMaximum(Calendar.MILLISECOND));
		return calendar.getTime();
	}

	/**
	 * 根据传入时间 获得此时间所在年的 第一天的日期
	 * 
	 * @param date
	 * @return
	 */
	public static Date getYearFristDay(long date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(date);
		calendar.set(Calendar.MONTH, calendar.getActualMinimum(Calendar.MONTH));
		calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));
		calendar.set(Calendar.HOUR_OF_DAY, calendar.getActualMinimum(Calendar.HOUR));
		calendar.set(Calendar.MINUTE, calendar.getActualMinimum(Calendar.MINUTE));
		calendar.set(Calendar.SECOND, calendar.getActualMinimum(Calendar.SECOND));
		calendar.set(Calendar.MILLISECOND, calendar.getActualMinimum(Calendar.MILLISECOND));
		return calendar.getTime();
	}

	/**
	 * 根据传入时间 获得此时间所在年的 最后一天的日期
	 * 
	 * @param date
	 * @return
	 */
	public static Date getYearLastDay(long date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(date);
		calendar.set(Calendar.MONTH, calendar.getActualMaximum(Calendar.MONTH));
		calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		calendar.set(Calendar.HOUR, calendar.getActualMaximum(Calendar.HOUR));
		calendar.set(Calendar.MINUTE, calendar.getActualMaximum(Calendar.MINUTE));
		calendar.set(Calendar.SECOND, calendar.getActualMaximum(Calendar.SECOND));
		calendar.set(Calendar.MILLISECOND, calendar.getActualMaximum(Calendar.MILLISECOND));
		return calendar.getTime();
	}

	/**
	 * 返回查询的开始时间
	 * 
	 * @param date
	 *            查询时间
	 * @return
	 */
	public static String getBeginTime(Date date) {
		return date == null ? "2011-12-01 00:00:00" : datetimeFormat.format(date);
	}

	/**
	 * 返回查询的结束时间
	 * 
	 * @param date
	 *            查询时间
	 * @return
	 */
	public static String getEndTime(Date date) {
		return date == null ? datetimeFormat.format(System.currentTimeMillis()) : datetimeFormat.format(date);
	}

	public static String currentTime() {
		DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return format.format(new Date());
	}

	public static String currentTime(String formatStr) {
		DateFormat format = new SimpleDateFormat(formatStr);
		return format.format(new Date());
	}

	/**
	 * 两个时间比较，是否相差24小时
	 * 
	 * @param old
	 * @param news
	 * @return true 超过24小时 false 未超过
	 */
	public static boolean compleDate(Date old, Date news) {
		if (old != null && news != null) {
			long oldLong = old.getTime();
			long newsLong = news.getTime();
			long cs = newsLong - oldLong;
			int s = 24 * 60 * 60 * 1000;
			if (cs > s) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 给定日期减一天
	 * 
	 * @param date
	 * @return
	 */
	public static Date datedel(Date date) {
		Calendar calendar = new GregorianCalendar();
		calendar.setTime(date);
		calendar.add(Calendar.DATE, -1);// 把日期往后增加一天.整数往后推,负数往前移动
		date = calendar.getTime(); // 这个时间就是日期往后推一天的结果
		return date;
	}

	/**
	 * 给定日期加减
	 * 
	 * @param date
	 * @return
	 */
	public static Date dateAd(Date date, int i) {
		Calendar calendar = new GregorianCalendar();
		calendar.setTime(date);
		calendar.add(Calendar.DATE, i);// 把日期往后增加一天.整数往后推,负数往前移动
		date = calendar.getTime(); // 这个时间就是日期往后推一天的结果
		return date;
	}

	/**
	 * unix timestamp转日期
	 * 
	 * @param beginDate
	 * @return
	 */
	public static String timestampToDate(String beginDate) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String sd = sdf.format(new Date(Long.parseLong(beginDate) * 1000));
		return sd;
	}

	/**
	 * 得到某年某周的第一天
	 * 
	 * @param year
	 * @param week
	 * @return
	 */
	public static Date getFirstDayOfWeek() {
		Calendar a = Calendar.getInstance();
		int year = a.get(Calendar.YEAR);
		int week = DateUtil.getWeekOfYear();
		week = week - 1;
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.YEAR, year);
		calendar.set(Calendar.MONTH, Calendar.JANUARY);
		calendar.set(Calendar.DATE, 1);

		Calendar cal = (Calendar) calendar.clone();
		cal.add(Calendar.DATE, week * 7);

		return getFirstDayOfWeek(cal.getTime());
	}

	/**
	 * 得到某年某周的最后一天
	 * 
	 * @param year
	 * @param week
	 * @return
	 */
	public static Date getLastDayOfWeek() {
		Calendar a = Calendar.getInstance();
		int year = a.get(Calendar.YEAR);
		int week = DateUtil.getWeekOfYear();
		week = week - 1;
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.YEAR, year);
		calendar.set(Calendar.MONTH, Calendar.JANUARY);
		calendar.set(Calendar.DATE, 1);
		Calendar cal = (Calendar) calendar.clone();
		cal.add(Calendar.DATE, week * 7);

		return getLastDayOfWeek(cal.getTime());
	}

	/**
	 * 取得当前日期所在周的第一天
	 * 
	 * @param date
	 * @return
	 */
	public static Date getFirstDayOfWeek(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setFirstDayOfWeek(Calendar.MONDAY);
		calendar.setTime(date);
		calendar.set(Calendar.DAY_OF_WEEK, calendar.getFirstDayOfWeek()); // MONDAY
		return calendar.getTime();
	}

	/**
	 * 取得当前日期所在周的最后一天
	 * 
	 * @param date
	 * @return
	 */
	public static Date getLastDayOfWeek(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setFirstDayOfWeek(Calendar.MONDAY);
		calendar.setTime(date);
		calendar.set(Calendar.DAY_OF_WEEK, calendar.getFirstDayOfWeek() + 6); // Saturday
		return calendar.getTime();
	}

	/**
	 * 把date格式的时间转换成int格式(精确到秒)
	 * 
	 * @param date
	 * @return
	 */
	public static int getTimeMillis(Date date) {
		Calendar aCalendar = Calendar.getInstance();
		if (date != null) {
			aCalendar.setTime(date);
			return (int) (aCalendar.getTimeInMillis() / 1000);
		}
		return 0;
	}

	/**
	 * @yhcip:title 返回指定格式的当前时间
	 * @yhcip:desc 返回指定格式的当前时间 getCurrentTime("yyyy-MM-dd") 返回 2007-04-29
	 * @param format
	 *            时间格式
	 * @return 得到当前时间的指定格式
	 * @author Administrator
	 */
	public static String getCurrentTime(String format) {
		String returnStr = null;
		SimpleDateFormat f = new SimpleDateFormat(format);
		java.util.Date date = new java.util.Date();
		returnStr = f.format(date);
		return returnStr;
	}

	/**
	 * @yhcip:title 得到当前时间
	 * @yhcip:desc 得到当前时间
	 * @return 返回当前时间 时间格式如：2007-04-29 11:39:08
	 * @author Administrator
	 */
	public static String getCurrentTime() {
		String returnStr = null;
		SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		java.util.Date date = new java.util.Date();
		returnStr = f.format(date);
		return returnStr;
	}

	/**
	 * 获取指定年月格式字符串的月初
	 * 
	 * @param designDate
	 *            指定日期 (格式为 yyyy-MM)
	 * @return 返回 yyyy-MM-dd 格式的字符串日期
	 * @throws ParseException
	 */
	public static String designMonthStart(String designDate) throws ParseException {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM");
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(format.parse(designDate));
		calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));
		return new SimpleDateFormat("yyyy-MM-dd").format(calendar.getTime());
	}

	/**
	 * 获取指定年月格式字符串的月末
	 * 
	 * @param designDate
	 *            指定日期 (格式为 yyyy-MM)
	 * @return 返回 yyyy-MM-dd 格式的字符串日期
	 * @throws ParseException
	 */
	public static String designMonthEnd(String designDate) throws ParseException {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM");
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(format.parse(designDate));
		calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		return new SimpleDateFormat("yyyy-MM-dd").format(calendar.getTime());
	}

	/**
	 * 根据所给的起始,终止时间来计算间隔天数
	 * 
	 * @param startDate
	 *            开始时间（yyyy-MM-dd）
	 * @param endDate
	 *            结束时间（yyyy-MM-dd）
	 * @return 间隔天数 重载sysframework的DateUtil.java的getIntervalDay方法，原方法有错
	 */
	public static int getIntervalDay(String startDate, String endDate) {
		Date startDate1 = null, enddate1 = null;
		try {
			startDate1 = dateFormat.parse(startDate);
			enddate1 = dateFormat.parse(endDate);
		} catch (ParseException e) {
			e.printStackTrace();
			return 0;
		}
		long startdate = startDate1.getTime();
		long enddate = enddate1.getTime();
		long interval = enddate - startdate;
		int intervalday = (int) (interval / (1000 * 60 * 60 * 24));
		return intervalday;
	}

	/**
	 * @yhcip:title 把字符串根据格式字符串转换为日期
	 * @yhcip:desc 把字符串根据格式字符串转换为日期
	 * @param strDate
	 *            字符串日期
	 * @param srcDateFormat
	 *            日期格式
	 * @return 日期
	 */
	public static Date stringToDate(String strDate, String srcDateFormat) {
		return new SimpleDateFormat(srcDateFormat).parse(strDate, new ParsePosition(0));
	}

	/**
	 * @yhcip:title 将用指定格式的字符串表示的日期转换成日期类型
	 * @yhcip:desc 将用指定格式的字符串表示的日期转换成日期类型
	 * @param strDate
	 *            要转换的日期字符串
	 * @param srcDateFormat
	 *            源日期格式字符串，如：“yyyy-MM-dd HH:mm:ss”，指明strDate包含的日期是什么格式，以便正确解析出日期
	 * @param dstDateFormat
	 *            目标日期格式字符串
	 * @return 日期
	 */
	public static Date stringToDate(String strDate, String srcDateFormat, String dstDateFormat) {

		Date rtDate = null;
		// 用源日期格式字符串，将日期字符串解析成日期类型
		Date tmpDate = new SimpleDateFormat(srcDateFormat).parse(strDate, new ParsePosition(0));
		// 将日期转换成目标格式字符串
		String tmpString = null;
		if (tmpDate != null) {
			tmpString = new SimpleDateFormat(dstDateFormat).format(tmpDate);
		}

		// 将目标日期字符串，转换成日期类型
		if (tmpString != null) {
			rtDate = new SimpleDateFormat(dstDateFormat).parse(tmpString, new ParsePosition(0));
		}
		return rtDate;
	}

	/**
	 * @yhcip:title 返回当前时间
	 * @yhcip:desc 返回当前时间
	 * @return 时间格式：yyyy-MM-dd
	 * @author Administrator
	 */
	public static String getCurDate() {
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat simpledateformat = new SimpleDateFormat("yyyy-MM-dd");
		return simpledateformat.format(calendar.getTime());
		// return getBusinessDate();
	}

	/**
	 * @yhcip:title 指定时间，返回一个指定格式的字符串
	 * @yhcip:desc 指定时间，返回一个指定格式的字符串
	 * @param date
	 *            指定时间
	 * @param format
	 *            时间格式
	 * @return 串
	 * @author Administrator
	 */
	public static String datetimeToString(java.util.Date date, String format) {
		if (date == null) {
			return null;
		}
		String strDate = "";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
		strDate = simpleDateFormat.format(date);
		return strDate;
	}
}
