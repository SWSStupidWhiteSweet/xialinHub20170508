package com.ruiyun.wechat.test;

import com.ruiyun.wechat.test.entity.AccessToken;
import com.ruiyun.wechat.test.entity.GroupId;
import com.ruiyun.wechat.test.entity.GroupName;
import com.ruiyun.wechat.test.entity.GroupName.Group;
import com.ruiyun.wechat.test.entity.GroupMsg.Filter;
import com.ruiyun.wechat.test.entity.GroupText;
import com.ruiyun.wechat.test.entity.OpenidListToGroup;
import com.ruiyun.wechat.test.entity.RespMsg;
import com.ruiyun.wechat.test.entity.TextGroupMsg;
import com.ruiyun.wechat.test.util.CommonUtil;

public class GroupMsgTest {

	public static final String appId = "wx55853991a53ca70d";
	public static final String appSecret = "75199bd3833cf8d7d4ffc1dfb44272df";
	
	public static void main(String[] args) {
			
		// 第三方用户唯一凭证
		//String appId = AccessConstant.getProp(AccessConstant.APPID);
		// 第三方用户唯一凭证密钥
		//String appSecret = AccessConstant.getProp(AccessConstant.APPSECRET);

		// 调用接口获取access_token
		AccessToken at = CommonUtil.getToken(appId, appSecret);
		System.out.println(at.getAccess_token());
		if (null != at) {
			//群发文本消息
			TextGroupMsg msg = createGroupMsg(at.getAccess_token());
			//群发的群组id
			int groupid = Integer.valueOf(msg.getFilter().getTag_id());
			//群发
			RespMsg respMsg = CommonUtil.sendGroupMsg(msg, TextGroupMsg.class, at.getAccess_token());
			//删除分组
			GroupId groupId = new GroupId();
			com.ruiyun.wechat.test.entity.GroupId.Group group = new com.ruiyun.wechat.test.entity.GroupId.Group();
			group.setId(groupid);
			groupId.setGroup(group);
			CommonUtil.deleteGroup(groupId, CommonUtil.getToken(appId, appSecret).getAccess_token());
			
			System.out.println(respMsg.getErrcode());
			System.out.println(respMsg.getErrmsg());;
			System.out.println(respMsg.getMsg_data_id());
			System.out.println(respMsg.getMsg_id());
			System.out.println(respMsg.getType());
		}
	}
	
	public static TextGroupMsg createGroupMsg(String access_token){
		//创建分组
		//AccessToken at = CommonUtil.getToken(appId, appSecret);
		GroupName groupName = new GroupName();
		Group group = new Group();
		group.setName("tttt");
		groupName.setGroup(group);
		int groupid = CommonUtil.createGroup(groupName, access_token);
		System.out.println("群组id ： "+groupid);
		//批量移动用户分组 
		//AccessToken at2 = CommonUtil.getToken(appId, appSecret);
		OpenidListToGroup openidListToGroup = new OpenidListToGroup();
		String[] strList = new String[]{"ocV8vv081Sr5-v9bd_AcDbEzGvS8"};
		openidListToGroup.setOpenid_list(strList);
		openidListToGroup.setTo_groupid(groupid);
		CommonUtil.removeGroupUser(openidListToGroup, access_token);
		
		//拼装群发的文本信息
		TextGroupMsg msg = new TextGroupMsg();
		Filter filter = new Filter();
		filter.setIs_to_all(false);
		filter.setTag_id(String.valueOf(groupid));
		msg.setFilter(filter);
		msg.setMsgtype("text");
		GroupText text = new GroupText();
		text.setContent("<a href='www.baidu.com'>终极测地方卡拉胶东方闪电成都市的成交量电视剧奖发送噼里啪啦的哗哗声</a>");
		msg.setText(text);
		return msg;
	}
	
}
