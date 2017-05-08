package xialinHub.com.common.exception;
/*
 *作者:xialin
 *日期:2017年5月8日
 *时间:下午3:43:22
 **/
public class XLException extends Exception {

	private static final long serialVersionUID = -7638561338753980730L;

	public XLException(Object obj) {
		super();
		
		this.obj = obj;
	}
	
	public XLException(Object obj, String msg) {
		super(msg);
		
		this.obj = obj;
	}
	
	private Object obj;

	public Object getObj() {
		return obj;
	}

	public void setObj(Object obj) {
		this.obj = obj;
	}
}
