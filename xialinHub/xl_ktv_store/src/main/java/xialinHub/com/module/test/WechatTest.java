package com.ruiyun.wechat.test;

import java.math.BigDecimal;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ruiyun.wechat.access.util.HttpUtil;
import com.ruiyun.wechat.access.util.WechatReturnCode;
import com.ruiyun.wechat.test.constant.WechatConstent;
import com.ruiyun.wechat.test.entity.AccessToken;
import com.ruiyun.wechat.test.util.CommonUtil;

public class WechatTest {

	private static final Logger log = LoggerFactory.getLogger(WechatTest.class);
	private static final String APPID = "wx51d8b22de4e97a2d";
	private static final String APPSECRET = "677ef7faadd03cda387da92ccc9527d5";
	
	// 获取微信服务器IP地址
	public static JSONArray getCallBackIp(String access_token){
		JSONArray ip = null;
		String requestUrl = WechatConstent.GET_CALLBACK_IP.replace("ACCESS_TOKEN", access_token);
		JSONObject json = HttpUtil.httpsRequest(requestUrl, "GET", null);
		if(json != null){
			try{
				ip = (JSONArray)json.get("ip_list");
			}catch(Exception e){
				log.error("获取微信服务器IP地址失败，errcode:{},errmsg{}", json.getInt("errcode"), 
						WechatReturnCode.getMsg(json.getInt("errcode")));
			}
		}
		return ip;
	}
	
	
	public static String longTimeToHMS(int longTime){
		String rtnStr = "";
		int seconds = 0;//秒
		int minues = 0;
		int hour = 0;
		
		float floatSeconds = 
				new BigDecimal(longTime).
				divide(new BigDecimal(1000), 2, BigDecimal.ROUND_HALF_UP).floatValue();
		//小于1秒的值
		if (floatSeconds<1) {
			rtnStr = String.valueOf(floatSeconds) + "秒";
		//大于1秒的值
		} else {
			seconds = longTime / 1000; //大于1秒就只取秒 不取毫秒
			//大于1分钟
			if((seconds / 60) > 0){
				minues = (seconds / 60);
				seconds =(seconds % 60);
				//大于1小时
				if((minues / 60) > 0){
					hour = (minues / 60);
					minues = (minues % 60);
					rtnStr = String.valueOf(hour) + "小时" + String.valueOf(minues) + "分钟" + String.valueOf(seconds) + "秒";
				//小于1小时	
				} else {
					rtnStr = String.valueOf(minues) + "分钟" + String.valueOf(seconds) + "秒";
				}
			//小于1分钟
			} else {
				rtnStr = String.valueOf(seconds) + "秒";
			}
		}
		return rtnStr;
	}
	
	public static void main(String[] args) {
//		AccessToken at = CommonUtil.getToken(APPID, APPSECRET);
//		JSONArray ip = getCallBackIp(at.getAccess_token());
//		System.out.println(ip);
		String str = longTimeToHMS(12);
		System.out.println(str);
	}
}
