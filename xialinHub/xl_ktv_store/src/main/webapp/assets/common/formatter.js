/**
 * 
 */

function statusFormatter(value) {
	switch (value) {
	case 0:
		return "<span style=\"color:red\">禁用</span>";
	case 1:
		return "<span style=\"color:blue\">启用</span>";
	default:
		return "未知状态";
	}
}
function statusQrcodeFormatter(value) {
	switch (value) {
	case 0:
		return "<span style=\"color:red\">无效</span>";
	case 1:
		return "<span style=\"color:blue\">有效</span>";
	default:
		return "未知状态";
	}
}
function typeQrcodeFormatter(value) {
	switch (value) {
	case 2:
		return "<span style=\"color:green\">临时</span>";
	case 1:
		return "<span style=\"color:blue\">永久</span>";
	default:
		return "未知状态";
	}
}
function busiTypeQrcodeFormatter(value){
	switch (value) {
	case 2:
		return "<span style=\"color:green\">置业顾问二维码</span>";
	case 1:
		return "<span style=\"color:blue\">楼盘二维码</span>";
	default:
		return "未知状态";
	}
}
function buildingPriceFormatter(value) {
    switch (value) {
        case 0:
            return "<span style=\"color:blue\">待定</span>";
        default:
            return "<span >"+value+"</span>";
    }
}
function startDateFormatter(value){
    switch (value) {
        case '1970-01-01':
            return "<span style=\"color:blue\">待定</span>";
        default:
            return "<span >"+value+"</span>";
    }
}
function  sale_statusFormatter(value) {
    switch (value) {
        case 1:
            return "<span style=\"color:blue\">期房在售</span>";
        case 2:
            return "<span style=\"color:blue\">现房在售</span>";
        case 3:
            return "<span style=\"color:blue\">待售</span>";
        case 4:
            return "<span style=\"color:red\">售罄</span>";
        default:
            return "未知状态";
    }
}

function yesOrNoFormatter(value) {
	switch (value) {
	case 0:
		return "<span style=\"color:red\">否</span>";
	case 1:
		return "<span style=\"color:blue\">是</span>";
	default:
		return "未知";
	}
}

function mainModeFormatter(value) {
	switch (value) {
	case 0:
		return "<span style=\"color:red\">否</span>";
	case 1:
		return "<span style=\"color:blue\">是</span>";
	default:
		return "未知模式";
	}
}

function sexFormatter(value){
	switch (value) {
	case 1:
		 return "男";
	case 2:
		 return "女";
	default:
		 return "未知";
	}
}

function msgencodingtypeFormatter(value) {
	switch (value) {
	case 1:
		return "<span style=\"color:blue\">明文模式</span>";
	case 2:
		return "<span style=\"color:blue\">兼容模式</span>";
	case 3:
		return "<span style=\"color:blue\">安全模式</span>";
	default:
		return "未知方式";
	}
}

function bindingFormatter(value) {
	switch (value) {
	case 0:
		return "<span style=\"color:blue\">未绑定</span>";
	case 1:
		return "<span style=\"color:green\">已绑定</span>";
	default:
		return "<span style=\"color:blue\">未绑定</span>";
	}
}

function useFormatter (value) {
	switch (value) {
	case 0:
		return "<span style=\"color:blue\">冻结</span>";
	case 1:
		return "<span style=\"color:green\">正常</span>";
	default:
		return "<span style=\"color:green\">正常</span>";
	}
}

function moneyFormatter (value) {
	if(!Common.isNull(value)){
		return value/100;
	}
	return 0;
}

/**本地图片格式化 */
function imgFormatter(value) {
	return "<img src=\"../../" + value + "\" width=\"40px\" height=\"40px\" style=\"border:solid 1px #989898;margin-top:5px\" onerror=\"this.src='../../image/noImg.png'\"/>";
}

/**远程图片格式化 直接访问**/
function userImgFormatter(value) {
	return "<img src=\"" + value + "\" width=\"40px\" height=\"40px\" style=\"border:solid 1px #989898;margin-top:5px\"  onerror=\"this.src='../../image/noImg.png'\"/>";
}

/** 默认组判断 */
function groupFormatter(value){
	if(value == "" || value == null) {
		return "默认组";
	}
	return value;
}

/**订单状态格式化 **/
function orderStatusFormatter(value) {
	switch (value){
	case 1:
		return "<font style=\"color:red;\">待确认</font>";
	case 2:
		return "<font style=\"color:blue;\">已确认</font>";
	case 3:
		return "<font style=\"color:green;\">已完成</font>";
	case 4:
		return "<font style=\"color:#6b8e23;\">信息未补全</font>";
    default:
    	return "<font style=\"color:#6b8e23;\">未知状态</font>";
	}
}

/**微信用户关注状态格式化**/
function provideFormatter(value) {
	switch (value){
	case 1:
		return "<font style=\"color:green\">是</font>";
	case 2:
		return "<font style=\"color:red\">否</font>";
    default:
    	return "<font style=\"color:#6b8e23\">未知状态</font>";
	}
}

/**价格格式  单位：元->元*/
function priceFormatter(value) {
	return "￥"+value+"元";
}

function priceYuanFormatter(value) {
	return "￥"+value/100+"元";
}

/**时间格式 单位：分钟*/
function timeFormatter(value){
	return value+"分钟";
}

/**充值状态*/
function rechargeStatusFormatter(value) {
	switch (value) {
	case 0:
		return "<font style=\"color:green\">充值失败</font>";
	case 1:
		return "<font style=\"color:red\">充值成功</font>";
    default:
    	return "<font style=\"color:#6b8e23\">未知状态</font>";
	}
}

/**消费状态*/
function payStatusFormatter(value) {
	switch (value) {
	case 0:
		return "<font style=\"color:green\">消费失败</font>";
	case 1:
		return "<font style=\"color:red\">消费成功</font>";
    default:
    	return "<font style=\"color:#6b8e23\">未知状态</font>";
	}
}

/**充值方式格式化**/
function rechargeWayFormatter(value) {
	switch (value) {
	case "1":
		return "<font style=\"color:green\">微信支付</font>";
	case "2":
		return "<font style=\"color:red\">现金支付</font>";
	case "3":
		return "<font style=\"color:blue\">活动赠送</font>";
    default:
    	return "<font style=\"color:#6b8e23\">未知状态</font>";
	}
}
/**套餐审核列表上下架状态**/
function isNOStartFormatteShelves(value) {
    switch (parseInt(value)) {
        case 0:
            return "<span style=\"color:red\">未上架</span>";
        case 1:
            return "<span style=\"color:blue\">上架中...</span>";
        case 2:
        	return "<span style=\"color:green\">下架中...</span>";
        default:
            return "未知状态";
    }
}
/**套餐列表上下架状态**/
function isStartFormatteShelves(value) {
    switch (parseInt(value)) {
        case 0:
            return "<span style=\"color:red\">未上架</span>";
        case 1:
            return "<span style=\"color:blue\">已上架</span>";
        case 2:
        	return "<span style=\"color:green\">已下架</span>";
        default:
            return "未知状态";
    }
}
/**
 * 套餐是否推荐
 * @param value
 * @returns {String}
 */
function isRecommendFormatteShelves(value) {
    switch (parseInt(value)) {
        case 0:
            return "<span style=\"color:red\">未推荐</span>";
        case 1:
            return "<span style=\"color:blue\">已推荐</span>";
        default:
            return "未知状态";
    }
}

function dateFormatter(value) {
	return value.substring(0, 10);
}

function dateTimeFormatter(value) {
	return value.substring(0, 19);
}
/**
 * 将常见的时间格式返回"2010-10-10"格式：只有年月日
 * @param value
 * @returns {String}
 * chentianjin
 */
function formartDate(value){
	var datetime = new Date(value);
	var year = datetime.getFullYear();
	var month = datetime.getMonth() + 1;
	var date = datetime.getDate();
	var hour = datetime.getHours();
	var minutes = datetime.getMinutes();
	var second = datetime.getSeconds();
	// 月，日，时，分，秒 小于10时，补0
	if (month < 10) {
		month = "0" + month;
	}
	if (date < 10) {
		date = "0" + date;
	}
	if (hour < 10) {
		hour = "0" + hour;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (second < 10) {
		second = "0" + second;
	}
	return year+"-"+month+"-"+date;
}
/**
 * 将常见的时间格式返回"2010-10-10 10:10:10"格式：只有年-月-日 时：分：秒
 * @param value
 * @returns {String}
 * chentianjin
 */
function formartDateTime(value){
	var datetime = new Date(value);
	var year = datetime.getFullYear();
	var month = datetime.getMonth() + 1;
	var date = datetime.getDate();
	var hour = datetime.getHours();
	var minutes = datetime.getMinutes();
	var second = datetime.getSeconds();
	// 月，日，时，分，秒 小于10时，补0
	if (month < 10) {
		month = "0" + month;
	}
	if (date < 10) {
		date = "0" + date;
	}
	if (hour < 10) {
		hour = "0" + hour;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (second < 10) {
		second = "0" + second;
	}
	return year+"-"+month+"-"+date+" "+hour+":"+minutes+":"+second;
}
function dateLongFormatter(value) {
	var now = new Date(value);
	var year = now.getYear();
	var month = now.getMonth() + 1;
	var date = now.getDate();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	return "20"+String(year).substring(1)+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
}

/**
 * 项目套餐格式化
 */
function packageTypeFormatter(value){
	switch (value) {
	case 1:
		return "非电商";
	case 2:
		return "电商";
	case 3:
		return "电商+非电商";
    default:
    	return "<font style=\"color:#6b8e23\">暂无</font>";
	}
}

/**
 * 渠道类型格式化
 */
function channelTypeFormatter(value){
	switch (value) {
	case 1:
		return "自然来访";
	case 2:
		return "中介";
	case 3:
		return "线上";
    default:
    	return "<font style=\"color:#6b8e23\">未知状态</font>";
	}
}

/**
 * 订单状态格式化
 */
function orderStatusFormatter111(value){
	var os = parseInt(value)//转换类型
	return orderStatusFormatter(os);
}
function orderStatusFormatter(value){
	switch (value) {
	case 1:
		return "到访";
	case 2:
		return "认筹";
	case 3:
		return "认购";
	case 4:
		return "签约待审";
	case 5:
		return "成交有效";
	case 6:
		return "退款";
	case 7:
		return "退房";
	case 8:
		return "退房且退款";
	case -1:
		return "废弃订单";
    default:
    	return "<font style=\"color:#6b8e23\">未知状态</font>";
	}
}

/**
 * 订单审核状态格式化
 */
function auditStatusFormatter(value){
	switch (value) {
	case 0:
		return "未审";
	case 1:
		return "通过";
	case 2:
		return "拒绝";
    default:
    	return "<font style=\"color:#6b8e23\">未知状态</font>";
	}
}

/**
 * 回款分配状态formatter
 */
function paymentStatusFormatter(value){
	switch (parseInt(value)) {
	case 1:
		return "待分配";
	case 2:
		return "分配中";
	case 3:
		return "分配完毕";
    default:
    	return "<font style=\"color:#6b8e23\">未知状态</font>";
	}
}

/**
 * 报备状态
 * @param value
 * @returns
 */
function orderRecdStatusFormatter(value){
	switch (parseInt(value)) {
	case 1:
		return "报备待确认";
	case 2:
		return "报备无效";
	case 3:
		return "报备有效";
	case 4:
		return "报备保护过期";
	case 5:
		return "到访无效";
	case 6:
		return "到访有效";
	case 7:
		return "到访保护过期";
    default:
    	return "<font style=\"color:#6b8e23\">未知状态</font>";
	}
}
/**
 * 是否全号报备
 * @param value
 * @returns
 */
function isAllTelFormatter(value){
	switch (parseInt(value)) {
	case 0:
		return "否";
	case 1:
		return "是";
    default:
    	return "<font style=\"color:#6b8e23\">未知状态</font>";
	}
}
/**
 * 楼盘日志审核状态
 * @author chentianjin
 * @param value
 * @returns {String}
 */
function audit_flagFormatter(value){
	switch (parseInt(value)) {
	case 0:
		return "<span style=\"color:blue\">未审核</span>";
	case 1:
		return "<span style=\"color:green\">通过</span>";
	case 2:
		return "<span style=\"color:red\">未通过</span>";
    default:
    	return "<font style=\"color:#6b8e23\">未知状态</font>";
	}
}
/**
 * 楼盘日志操作标识
 * @author chentianjin
 * @param value
 * @returns {String}
 */
function operate_flagFormatter(value){
	switch (value) {
	case "C":
		return "创建";
	case "U":
		return "更新";
	case "D":
		return "删除";
	case "P":
		return "上架申请";
	case "W":
		return "下架申请";
	case "M":
		return "套餐推荐";
    default:
    	return "<font style=\"color:#6b8e23\">未知方式</font>";
	}
}
/**
 * 结佣对象标识
 * @param value
 * @returns {String}
 */
function brokerageObjectFormatter(value){
	switch (parseInt(value)){
	case 1:
		return "经纪公司";
	case 2:
		return "门店";
	default:
		return "未知对象";
	}
}
/**
 * pos流水-POS机类型
 * @author tqy
 * @param value
 * @returns {String}
 */
function eb_account_detail_typeFormatter(value){
	switch (value) {
	case "1":
		return "新POS";
	case "2":
		return "旧POS";
	case "3":
		return "转账";
    default:
    	return "<font style=\"color:#6b8e23\">未知类型</font>";
	}
}
/**
 * pos流水-渠道
 * @author tqy
 * @param value
 * @returns {String}
 */
function channel_typeFormatter(value){
	switch (value) {
	case "1":
		return "自然来访";
	case "2":
		return "中介";
	case "3":
		return "线上";
    default:
    	return "<font style=\"color:#6b8e23\">未知渠道</font>";
	}
}
/**
 * pos流水-创建来源
 * @author tqy
 * @param value
 * @returns {String}
 */
function create_srcFormatter(value){
	switch (value) {
	case "1":
		return "批量导入";
	case "2":
		return "录入";
	case "3":
		return "自动";
    default:
    	return "<font style=\"color:#6b8e23\">未知来源</font>";
	}
}
/**
 * pos流水-卡片类型
 * @author tqy
 * @param value
 * @returns {String}
 */
function pay_account_typeFormatter(value){
	switch (value) {
	case "C":
		return "贷记卡";
	case "D":
		return "借记卡";
    default:
    	return "<font style=\"color:#6b8e23\">未知类型</font>";
	}
}
/**
 * pos流水-成交审核状态
 * @author tqy
 * @param value
 * @returns {String}
 */
function audit_statusFormatter(value){
	switch (value) {
	case "0":
		return "未审";
	case "1":
		return "通过";
	case "2":
		return "拒绝";
	case "3":
		return "提交";
	case "4":
		return "上架申请";
	case "5":
		return "下架申请";
    default:
    	return "<font style=\"color:#6b8e23\">未知状态</font>";
	}
}
/**
 * pos机类型
 * @param value
 * @returns {String}
 */
function posFormatter (value) {
	switch (value) {
	case 1:
		return "新POS";
	case 2:
		return "旧POS";
	}
}
function chooseFormatter (value) {
	switch (value) {
	case 0:
		return "分配";
	case 1:
		return "调拨";
	}
}

/**
 * 前三后四格式化手机号
 */
function phoneFormatter(value){
	if(!Common.isEmpty(value)){
		if(value.length == 11){
			return value.substring(0,3)+"****"+value.substring(7);
		}else{
			return value;
		}
	}else{
		return "";
	}
}

/**
 * 是否原卡原退
 * @param value
 * @returns {String}
 */
function isToSrcFormatter(value) {
	switch (value) {
	case 0:
		return "否";
	case 1:
		return "是";
	}
	
}

function complainStatus(value) {
	switch (value){
		case 0:
			return "无效";
		case 1:
			return "有效";
	}
}

function complainCloseStatus(value) {
	switch (value){
		case 1:
			return "未关闭";
		case 2:
			return "跟进中";
		case 3:
			return "已关闭";
	}
}
	
