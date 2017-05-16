package xialinHub.com.module.test.util;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ruiyun.wechat.access.constant.AccessConstant;
import com.ruiyun.wechat.access.entity.JSTicket;
import com.ruiyun.wechat.access.util.HttpUtil;
import com.ruiyun.wechat.access.util.WechatReturnCode;
import com.ruiyun.wechat.test.constant.WechatConstent;
import com.ruiyun.wechat.test.entity.AccessToken;
import com.ruiyun.wechat.test.entity.GroupName;
import com.ruiyun.wechat.test.entity.OpenidListToGroup;
import com.ruiyun.wechat.test.entity.GroupMsg;
import com.ruiyun.wechat.test.entity.RespMsg;
import com.ruiyun.wechat.test.entity.WechatTemplate;

/**
 * 微信通用工具类 Copyright 2016 重庆锐云科技有限公司
 * 
 * @author ZhangHaonan
 * @date 2016-06-18
 * @version 1.0
 */
public class CommonUtil {

	private static final Logger log = LoggerFactory.getLogger(CommonUtil.class);
	
	/**
	 * 获取接口访问凭证
	 * 
	 * @param appid
	 *            凭证
	 * @param appsecret
	 *            密钥
	 * @return
	 */
	public static AccessToken getToken(String appid, String appsecret) {
		AccessToken token = null;
		String requestUrl = WechatConstent.ACCESS_TOKEN_URL.replace("APPID", appid).replace("APPSECRET", appsecret);
		// 发起GET请求获取凭证
		JSONObject jsonObject = HttpUtil.httpsRequest(requestUrl, "GET", null);

		if (null != jsonObject) {
			try {
				token = JacksonJsonUtil.jsonToEntity(jsonObject.toString(), AccessToken.class);
			} catch (JSONException e) {
				token = null;
				// 获取token失败
				log.error("获取token失败 errcode:{} errmsg:{}", jsonObject.getInt("errcode"),
						WechatReturnCode.getMsg(jsonObject.getInt("errcode")));
			}
		}
		return token;
	}
	
	/**
	 * 发送模板消息
	 * 
	 * @param accessToken
	 * @param openId
	 * @return 0表示成功，其它值表示失败
	 */
	public static int sendTemplateMessage(String accessToken, WechatTemplate template) {
		int result = 0;
		String requestUrl = WechatConstent.TEMPLATE_SEND.replace("ACCESS_TOKEN", accessToken);
		String json = JSONObject.fromObject(template).toString();
		System.out.println(json);
		JSONObject jsonObject = HttpUtil.httpsRequest(requestUrl, "POST", json);
		if (null != jsonObject) {
			if (0 != jsonObject.getInt("errcode")) {
				result = jsonObject.getInt("errcode");
				log.error("发送模板消息失败 errcode:{} errmsg:{}", jsonObject.getInt("errcode"),
						WechatReturnCode.getMsg(jsonObject.getInt("errcode")));
			}
		}
		return result;
	}
	
	/**
	 * 群发消息(通过tag标签进行群发)
	 * 
	 * @param msg
	 * @param clazz
	 * @param accessToken
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static <T> RespMsg sendGroupMsg(GroupMsg msg, Class<T> clazz, String accessToken) {
		RespMsg resp = null;
		T t = (T) msg;
		String requestUrl = WechatConstent.GROUP_TAG.replace("ACCESS_TOKEN", accessToken);
		// String param = JSONObject.fromObject(t).toString();
		String param = JacksonJsonUtil.objectToJSON(t).toString();
		// String param =
		// "{\"filter\":{\"is_to_all\":true},\"msgtype\":\"text\",\"text\":{\"content\":\"测试群发消息\"}}";
		JSONObject jsonObject = HttpUtil.httpsRequest(requestUrl, "POST", param);
		if (null != jsonObject) {
			if (0 != jsonObject.getInt("errcode")) {
				log.error("群发消息失败 errcode:{} errmsg:{}", jsonObject.getInt("errcode"),
						WechatReturnCode.getMsg(jsonObject.getInt("errcode")));
			} else {
				resp = JacksonJsonUtil.jsonToEntity(jsonObject.toString(), RespMsg.class);
			}
		}
		return resp;
	}

	/**
	 * 创建分组
	 * @return
	 */
	public static int createGroup(GroupName groupName, String accessToken){
		int id = -1;
		String requestUrl = WechatConstent.CREATE_GROUP.replace("ACCESS_TOKEN", accessToken);
		// 将菜单对象转换为字符串
		String groupJSONStr = JSONObject.fromObject(groupName).toString();
		// 发送请求
		JSONObject jsonObject = HttpUtil.httpsRequest(requestUrl, "POST", groupJSONStr);
		if (null != jsonObject) {
			try {
				//分组id
				id = jsonObject.getJSONObject("group").getInt("id");
			} catch (Exception e) {
				// 创建分组失败
				log.error("创建分组失败 errcode:{} errmsg:{}", jsonObject.getInt("errcode"),
						WechatReturnCode.getMsg(jsonObject.getInt("errcode")));
			}
		}
		return id;
	}
	
	/**
	 * 批量移动用户分组 
	 * @param openidListJson
	 * @param accessToken
	 * @return
	 */
	public static int removeGroupUser(OpenidListToGroup openidListToGroup, String accessToken){
		int result = 0;
		String requestUrl = WechatConstent.REMOVE_USER_GROUP.replace("ACCESS_TOKEN", accessToken);
		// 将菜单对象转换为字符串
		String openidListToGroupStr = JSONObject.fromObject(openidListToGroup).toString();
		// 发送请求
		JSONObject jsonObject = HttpUtil.httpsRequest(requestUrl, "POST", openidListToGroupStr);
		if (null != jsonObject) {
			if (0 != jsonObject.getInt("errcode")) {
				result = jsonObject.getInt("errcode");
				log.error("批量移动用户分组 失败 errcode:{} errmsg:{}", jsonObject.getInt("errcode"),
						WechatReturnCode.getMsg(jsonObject.getInt("errcode")));
			}
		}
		return result;
	}
	
	/**
	 * 删除分组
	 * @param group
	 * @param accessToken
	 * @return
	 */
	public static int deleteGroup(com.ruiyun.wechat.test.entity.GroupId groupId, String accessToken){
		int result = 0;
		String requestUrl = WechatConstent.DELETE_USER_GROUP.replace("ACCESS_TOKEN", accessToken);
		// 将菜单对象转换为字符串
		String groupStr = JSONObject.fromObject(groupId).toString();
		// 发送请求
		JSONObject jsonObject = HttpUtil.httpsRequest(requestUrl, "POST", groupStr);
		if (null != jsonObject) {
			if (0 != jsonObject.getInt("errcode")) {
				result = jsonObject.getInt("errcode");
				log.error("创建菜单失败 errcode:{} errmsg:{}", jsonObject.getInt("errcode"),
						WechatReturnCode.getMsg(jsonObject.getInt("errcode")));
			}
		}
		return result;
	}
	
	/**
	 * 获取js票据
	 * 
	 * @param accessToken
	 * @return
	 */
	public static JSTicket getJSTicket(String accessToken) {
		JSTicket js = null;
		String requestUrl = AccessConstant.JS_API_TICKET_URL.replace("ACCESS_TOKEN", accessToken);
		JSONObject jsonObject = HttpUtil.httpsRequest(requestUrl, "GET", null);
		if (null != jsonObject) {
			try {
				js = JacksonJsonUtil.jsonToEntity(jsonObject.toString(), JSTicket.class);
			} catch (Exception e) {
				js = null;
				// 获取token失败
				log.error("获取js_ticket失败 errcode:{} errmsg:{}", jsonObject.getInt("errcode"),
						WechatReturnCode.getMsg(jsonObject.getInt("errcode")));
			}
		}
		return js;
	}
	
	public static void main(String[] args) {
		AccessToken token = getToken("wx51d8b22de4e97a2d","677ef7faadd03cda387da92ccc9527d5");
		System.out.println(token.getAccess_token());
		JSTicket ticket= getJSTicket(token.getAccess_token());
		System.out.println(ticket.getTicket());
	}
	
}
