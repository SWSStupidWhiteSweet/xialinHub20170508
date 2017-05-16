package xialinHub.com.module.test.entity;

public class RespMsg {

	private String type;

	private int errcode;

	private String errmsg;

	private long msg_id;

	private long msg_data_id;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
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

	public long getMsg_id() {
		return msg_id;
	}

	public void setMsg_id(long msg_id) {
		this.msg_id = msg_id;
	}

	public long getMsg_data_id() {
		return msg_data_id;
	}

	public void setMsg_data_id(long msg_data_id) {
		this.msg_data_id = msg_data_id;
	}

}
