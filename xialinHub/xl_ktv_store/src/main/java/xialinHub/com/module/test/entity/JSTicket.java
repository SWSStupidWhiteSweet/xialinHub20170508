package xialinHub.com.module.test.entity;

import java.io.Serializable;

/**
 * 微信网页jssdk调用票据实体类
 * Copyright 2016 重庆锐云科技有限公司
 * @author ZhangHaonan
 * @date 2016-06-18
 * @version 1.0
 */
public class JSTicket implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private int errcode;

	private String errmsg;

	private String ticket;

	private int expires_in;

	public String getTicket() {
		return ticket;
	}

	public void setTicket(String ticket) {
		this.ticket = ticket;
	}

	public int getExpires_in() {
		return expires_in;
	}

	public void setExpires_in(int expires_in) {
		this.expires_in = expires_in;
	}

	public int getErrcode() {
		return errcode;
	}

	public void setErrcode(int errcode) {
		this.errcode = errcode;
	}

	public String getErrmsg() {
		return errmsg;
	}

	public void setErrmsg(String errmsg) {
		this.errmsg = errmsg;
	}

}
