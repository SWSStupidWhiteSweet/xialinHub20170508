package com.ruiyun.wechat.test;

import java.util.HashMap;
import java.util.Map;

import com.ruiyun.wechat.access.entity.JSTicket;
import com.ruiyun.wechat.test.entity.AccessToken;
import com.ruiyun.wechat.test.entity.TemplateData;
import com.ruiyun.wechat.test.entity.WechatTemplate;
import com.ruiyun.wechat.test.util.CommonUtil;

public class TemplateTest {

	public static void main(String[] args) {

	/*	// 第三方用户唯一凭证
//		String appId = AccessConstant.getProp(AccessConstant.APPID);
		String appId = "wx51d8b22de4e97a2d";
		// 第三方用户唯一凭证密钥
//		String appSecret = AccessConstant.getProp(AccessConstant.APPSECRET);
		String appSecret = "677ef7faadd03cda387da92ccc9527d5";

		// 调用接口获取access_token
		AccessToken at = CommonUtil.getToken(appId, appSecret);
		System.out.println(at.getAccess_token());
		String openId = "oNbhlxDqLv-qc4NcgBzPSDEPD_e0";
		if (null != at) {
			int result = CommonUtil.sendTemplateMessage(at.getAccess_token(),getTemplate(openId));
			
			if (0 == result) {
				System.out.println("发送模板消息成功成功！");
			} else {
				System.out.println("发送模板消息失败，错误码：" + result);
			}
		}*/

		AccessToken token = CommonUtil.getToken("wx51d8b22de4e97a2d", "677ef7faadd03cda387da92ccc9527d5");
		System.out.println(token.getAccess_token());
//		List<String> userList = CommonUtil.getUserList(token.getAccess_token());
//		System.out.println(userList.size());
		//System.out.println(token.getAccess_token());
		JSTicket ticket = CommonUtil.getJSTicket(token.getAccess_token());
		System.out.println(ticket.getTicket());
		
	}

	public static WechatTemplate getTemplate(String openId) {
		WechatTemplate template = new WechatTemplate();
		template.setUrl("");//http://www.baidu.com
		template.setTouser(openId);
		template.setTemplate_id("dBo5GyKMfnRU7CcFq3lf2-pQugU5kZ4KBn8RoEnpSaw");
		
		Map<String,TemplateData> map = new HashMap<String, TemplateData>();
		TemplateData data1 = new TemplateData();
		data1.setColor("#666666");
		data1.setValue("http://www.apoints.com/graphics/UploadFiles/200803/20080301202754140.jpg");
		map.put("param1",data1);
		
		TemplateData data2 = new TemplateData();
		data2.setColor("#000000");
		data2.setValue("这是测试的模板消息2");
		map.put("param2",data2);
		
		template.setData(map);
		
		
		return template;
	}
}
