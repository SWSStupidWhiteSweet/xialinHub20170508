/**
 * 订单相关状态码表
 * zhujianwei
 */
var orderConstant ={
		
	recordStatus:{
		RECORD_STATUS_RECORD_WAIT:1,//报备待确认
		RECORD_STATUS_RECORD_FAILURE:2,//报备无效
		/** 报备有效 */
		RECORD_STATUS_RECORD_EFFECT:3,//报备有效
		RECORD_STATUS_RECORD_OVER:4,//报备保护过期
		RECORD_STATUS_VISIT_FAILURE:5,//到访无效
		/** 到访有效 */
		RECORD_STATUS_VISTI_EFFECT:6,//到访有效
		RECORD_STATUS_VISIT_OVER:7//到访保护过期
	},
	/**
	 * 是否全号报备
	 */
	isAllTel:{
		NOT_ALL_TEL:0,//否
		ALL_TEL:1//是
	},
	/** 渠道类型 */
	channelType:{
		ZR:1,//自然
		ZJ:2,//中介
		XS:3//线上
	}
}