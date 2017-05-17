package xialinHub.com.module.test.constant;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

import xialinHub.com.util.tool.ClassPathUtil;
import xialinHub.com.util.tool.ProFileReader;

/**
 * 微信接口常量类 Copyright 2016 重庆锐云科技有限公司
 * 
 * @author ZhangHaonan
 * @date 2016-06-18
 * @version 1.0
 */
public class AccessConstant {

	private static ProFileReader accessProp = null;

	/********************** properties文件中的key ***************************/
	@Deprecated
	public static final String APPID = "appID";
	@Deprecated
	public static final String APPSECRET = "appsecret";
	@Deprecated
	public static final String TOKEN = "Token";
	@Deprecated
	public static final String URL = "URL";
	@Deprecated
	public static final String ENCODINGAESKEY = "EncodingAESKey";
	@Deprecated
	public static final String DOMAINNAME = "DomainName";
	public static final String ALLOWBROWSER = "allowBrowser";

	/*********************************** 请求地址 **************************************/
	/** 获取accesstoken地址 *************************************************/
	public static final String ACCESS_TOKEN_URL = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET";

	/** 获取jsapi_ticket地址 *************************************************/
	public static final String JS_API_TICKET_URL = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi";

	/** 菜单地址 *************************************************/
	// 创建菜单地址(post)
	public static final String CREATE_MENU_URL = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN";
	// 查询菜单地址get
	public static final String QUERY_MENU_URL = "https://api.weixin.qq.com/cgi-bin/menu/get?access_token=ACCESS_TOKEN";
	// 删除菜单地址get
	public static final String DELETE_MENU_URL = "https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=ACCESS_TOKEN";

	/** 用户管理地址 *************************************************/
	// 获取用户基本信息
	public static final String GET_USER_INFO = "https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN";
	//获取用户列表(第2-n次)
	public static final String GET_USER_LIST_SECOND = "https://api.weixin.qq.com/cgi-bin/user/get?access_token=ACCESS_TOKEN&next_openid=NEXT_OPENID";
	//获取用户列表(第一次)
	public static final String GET_USER_LIST_FIRST = "https://api.weixin.qq.com/cgi-bin/user/get?access_token=ACCESS_TOKEN";

	/** 网页授权地址 *************************************************/
	// 网页授权地址
	public static final String SNSAPI_REDIRECT_URL = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect";
	// 获取网页授权access_token地址
	public static final String SNSAPI_TOKEN_URL = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code";
	// 刷新网页access_token地址
	public static final String SNSAPI_REFRESH_TOKEN_URL = "https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=APPID&grant_type=refresh_token&refresh_token=REFRESH_TOKEN";
	// 拉取用户信息
	public static final String SNNAPI_USER_INFO_URL = "https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN";

	/** 模板消息地址 *************************************************/
	// 设置所属行业post
	public static final String TEMPLATE_SET_INDUSTRY = "https://api.weixin.qq.com/cgi-bin/template/api_set_industry?access_token=ACCESS_TOKEN";
	// 获取设置的行业信息
	public static final String TEMPLATE_GET_INDUSTRY = "https://api.weixin.qq.com/cgi-bin/template/get_industry?access_token=ACCESS_TOKEN";
	// 获取模板id post
	public static final String TEMPLATE_GET_ID = "https://api.weixin.qq.com/cgi-bin/template/api_add_template?access_token=ACCESS_TOKEN";
	// 获取模板列表
	public static final String TEMPLATE_GET_LIST = "https://api.weixin.qq.com/cgi-bin/template/get_all_private_template?access_token=ACCESS_TOKEN";
	// 删除模板
	public static final String TEMPLATE_DELETE = "https://api,weixin.qq.com/cgi-bin/template/del_private_template?access_token=ACCESS_TOKEN";
	// 发送模板消息post
	public static final String TEMPLATE_SEND = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=ACCESS_TOKEN";

	/** 素材管理地址 *************************************************/
	// 新增临时素材post
	public static final String MATERIAL_UPLOAD_TEMP = "https://api.weixin.qq.com/cgi-bin/media/upload?access_token=ACCESS_TOKEN&type=TYPE";
	// 获取临时素材
	public static final String MATERIAL_GET_TEMP = "https://api.weixin.qq.com/cgi-bin/media/get?access_token=ACCESS_TOKEN&media_id=MEDIA_ID";
	// 新增永久素材post
	public static final String MATERIAL_UPLOAD_PERMANENT = "https://api.weixin.qq.com/cgi-bin/material/add_news?access_token=ACCESS_TOKEN";
	// 获取永久素材post
	public static final String MATERIAL_GET_PERMANENT = "https://api.weixin.qq.com/cgi-bin/material/get_material?access_token=ACCESS_TOKEN";
	// 删除永久素材post
	public static final String MATERIAL_DEL_PERMANENT = "https://api.weixin.qq.com/cgi-bin/material/del_material?access_token=ACCESS_TOKEN";
	// 修改永久素材post
	public static final String MATERIAL_MODIFY_PERMANENT = "https://api.weixin.qq.com/cgi-bin/material/update_news?access_token=ACCESS_TOKEN";
	// 获取素材总数
	public static final String MATERIAL_TOTAL_COUNT = "https://api.weixin.qq.com/cgi-bin/material/get_materialcount?access_token=ACCESS_TOKEN";
	// 获取素材列表post
	public static final String MATERIAL_TOTAL_LIST = "https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=ACCESS_TOKEN";

	/** 群发消息地址 *************************************************/
	// 根据标签进行群发【订阅号与服务号认证后均可用】post
	public static final String GROUP_TAG = "https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=ACCESS_TOKEN";
	// 根据OpenID列表群发【订阅号不可用，服务号认证后可用】post
	public static final String GROUP_OPENID = "https://api.weixin.qq.com/cgi-bin/message/mass/send?access_token=ACCESS_TOKEN";
	// 删除群发【订阅号与服务号认证后均可用】post
	public static final String GROUP_DELETE = "https://api.weixin.qq.com/cgi-bin/message/mass/delete?access_token=ACCESS_TOKEN";
	// 预览接口【订阅号与服务号认证后均可用】post
	public static final String GROUP_PREVIEW = "https://api.weixin.qq.com/cgi-bin/message/mass/preview?access_token=ACCESS_TOKEN";
	// 查询群发消息发送状态【订阅号与服务号认证后均可用】post
	public static final String GROUP_STATUS = "https://api.weixin.qq.com/cgi-bin/message/mass/get?access_token=ACCESS_TOKEN";
	
	/** 客服接口地址 *************************************************/
	//客服接口-发消息
	public static final String CUSTOM_SEND_MSG = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=ACCESS_TOKEN";
	
	/** 生成二维码 *************************************************/
	//创建临时二维码ticket post
	public static final String TWOD_BARCODE_TEMP_TICKET = "https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=TOKEN";
	//创建永久二维码ticket post
	public static final String TWOD_BARCODE_PERMANENT_TICKET = "https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=TOKEN";
	//	通过ticket换取二维码【ticket需要进行UrlEncode】
	public static final String TWOD_BARCODE_GET = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=TICKET";
	
	//二维码类型
	//临时
	public static final String TWOD_BARCODE_TEMP = "QR_SCENE";
	//永久类型(二维码详细信息为id)
	public static final String TWOD_BARCODE_PERMANENT_ID = "QR_LIMIT_SCENE";
	//永久类型(二维码详细信息为str)
	public static final String TWOD_BARCODE_PERMANENT_STR = "QR_LIMIT_STR_SCENE";
	
	/******************************** 响应类型 ***********************************/
	// 请求消息类型：文本
	public static final String REQ_MESSAGE_TYPE_TEXT = "text";
	// 请求消息类型：图片
	public static final String REQ_MESSAGE_TYPE_IMAGE = "image";
	// 请求消息类型：语音
	public static final String REQ_MESSAGE_TYPE_VOICE = "voice";
	// 请求消息类型：视频
	public static final String REQ_MESSAGE_TYPE_VIDEO = "video";
	// 请求消息类型：小视频
	public static final String REQ_MESSAGE_TYPE_SHORTVIDEO = "shortvideo";
	// 请求消息类型：地理位置
	public static final String REQ_MESSAGE_TYPE_LOCATION = "location";
	// 请求消息类型：链接
	public static final String REQ_MESSAGE_TYPE_LINK = "link";

	/** 请求消息类型：事件推送 */ 
	public static final String REQ_MESSAGE_TYPE_EVENT = "event";

	/** 事件类型：subscribe(订阅) */ 
	public static final String EVENT_TYPE_SUBSCRIBE = "subscribe";
	/** 事件类型：unsubscribe(取消订阅) */ 
	public static final String EVENT_TYPE_UNSUBSCRIBE = "unsubscribe";
	/** 事件类型：scan(用户已关注时的扫描带参数二维码) */ 
	public static final String EVENT_TYPE_SCAN = "SCAN";
	// 事件类型：LOCATION(上报地理位置)
	public static final String EVENT_TYPE_LOCATION = "LOCATION";
	// 事件类型：CLICK(自定义菜单)
	public static final String EVENT_TYPE_CLICK = "CLICK";
	// 事件类型:view(自定义菜单跳转事件)
	public static final String EVENT_TYPE_VIEW = "VIEW";
	// 事件类型:群发消息事件推送
	public static final String EVENT_TYPE_SENDJOB = "MASSSENDJOBFINISH";

	// 响应消息类型：文本
	public static final String RESP_MESSAGE_TYPE_TEXT = "text";
	// 响应消息类型：图片
	public static final String RESP_MESSAGE_TYPE_IMAGE = "image";
	// 响应消息类型：语音
	public static final String RESP_MESSAGE_TYPE_VOICE = "voice";
	// 响应消息类型：视频
	public static final String RESP_MESSAGE_TYPE_VIDEO = "video";
	// 响应消息类型：音乐
	public static final String RESP_MESSAGE_TYPE_MUSIC = "music";
	// 响应消息类型：图文
	public static final String RESP_MESSAGE_TYPE_NEWS = "news";
	
	//菜单类型 点击
	public static final String MENU_TYPE_CLICK = "click";
	//菜单类型 跳转
	public static final String MENU_TYPE_VIEW = "view";

	private static ProFileReader getAccessProp() {
		if (accessProp == null) {
			String path = ClassPathUtil.getPath() + "resource/wechat_conf.properties";
			System.out.println(path);
			File file = new File(path);
			try {
				accessProp = new ProFileReader(new FileInputStream(file));
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			}
		}
		return accessProp;
	}

	public static String getProp(String key) {
		return AccessConstant.getAccessProp().getParamValue(key);
	}

	/*
	 * public static void main(String[] args) { System.out.println(AccessConstant.getProp("allowBrowser")); }
	 */

}
