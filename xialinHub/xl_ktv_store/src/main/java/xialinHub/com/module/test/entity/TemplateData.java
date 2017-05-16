package xialinHub.com.module.test.entity;

/**
 * 微信模板消息数据类
 * Copyright 2016 重庆锐云科技有限公司
 * @author ZhangHaonan
 * @date 2016-06-18
 * @version 1.0
 */
public class TemplateData {

	private String value;
	private String color = "#000000";

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	@Override
	public String toString() {
		return "TemplateData [value=" + value + ", color=" + color + "]";
	}

}
