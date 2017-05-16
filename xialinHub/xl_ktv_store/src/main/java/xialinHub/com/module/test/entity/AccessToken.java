package xialinHub.com.module.test.entity;

import java.io.Serializable;

/**
 * 微信访问凭证实体类 Copyright 2016 重庆锐云科技有限公司
 * 
 * @author ZhangHaonan
 * @date 2016-06-18
 * @version 1.0
 */
public class AccessToken implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	// 接口访问凭证
	private String access_token;
	// 凭证有效期，单位：秒
	private int expires_in;

	public String getAccess_token() {
		return access_token;
	}

	public void setAccess_token(String access_token) {
		this.access_token = access_token;
	}

	public int getExpires_in() {
		return expires_in;
	}

	public void setExpires_in(int expires_in) {
		this.expires_in = expires_in;
	}
}
