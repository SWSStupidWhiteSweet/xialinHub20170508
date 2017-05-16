package xialinHub.com.module.test.entity;


public class GroupMsg {
	
	private String msgtype;
	
	private Filter filter;

	public String getMsgtype() {
		return msgtype;
	}

	public void setMsgtype(String msgtype) {
		this.msgtype = msgtype;
	}
	
	public Filter getFilter() {
		return filter;
	}

	public void setFilter(Filter filter) {
		this.filter = filter;
	}

	public static class Filter {
		private boolean is_to_all;
		private String tag_id;

		/*private String group_id;
		
		public String getGroup_id() {
			return group_id;
		}

		public void setGroup_id(String group_id) {
			this.group_id = group_id;
		}*/

		public boolean isIs_to_all() {
			return is_to_all;
		}

		public void setIs_to_all(boolean is_to_all) {
			this.is_to_all = is_to_all;
		}

		public String getTag_id() {
			return tag_id;
		}

		public void setTag_id(String tag_id) {
			this.tag_id = tag_id;
		}

	}
}
