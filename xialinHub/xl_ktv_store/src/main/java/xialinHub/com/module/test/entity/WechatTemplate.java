package xialinHub.com.module.test.entity;

import java.util.Map;

/**
 * 微信模板消息类
 * Copyright 2016 重庆锐云科技有限公司
 * @author ZhangHaonan
 * @date 2016-06-18
 * @version 1.0
 */
public class WechatTemplate {

	private String touser;
	private String template_id;
	private String url;
	private Map<String, TemplateData> data;

	public String getTouser() {
		return touser;
	}

	public void setTouser(String touser) {
		this.touser = touser;
	}

	public String getTemplate_id() {
		return template_id;
	}

	public void setTemplate_id(String template_id) {
		this.template_id = template_id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Map<String, TemplateData> getData() {
		return data;
	}

	public void setData(Map<String, TemplateData> data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "WechatTemplate [touser=" + touser + ", template_id="
				+ template_id + ", url=" + url + ", data=" + data + "]";
	}

}
