$(function($) {
	// 搜索参考号
	$("#searchTransRefNo")
			.click(
					function() {
						var tradeRefCode = $("#tradeRefCode").val();
						if (tradeRefCode == null || tradeRefCode == '') {
							Common.messageBox("提示", "请输入交易参考号！", false);
							return false;

						}
						if (tradeRefCode.length != 12) {
							Common.messageBox("提示", "请输入12位交易参考号！", false);
							return false;

						}
						var ebAccountDetailType = $("#ebAccountDetailType")
								.val();
						if (ebAccountDetailType == null
								|| ebAccountDetailType == '') {
							Common
									.messageBox("提示", "请选择交易参考号对应的POS机类型！",
											false);
							return false;

						}

						var params = {};
						params.tradeRefCode = tradeRefCode;
						params.ebAccountDetailType = ebAccountDetailType;

						$
								.ajax({
									type : "post",
									url : 'searchTransRefNo',
									data : params,
									dataType : 'json',
									success : function(data) {
										$("#fead-table tbody tr").remove();
										if (data.status == "SUCCESS") {
											var fead = data.fead;
											var trHtml = '<tr>';
											trHtml += '<td>'
													+ fead.posTerminalCode
													+ '</td>';
											trHtml += '<td>'
													+ fead.tradeRefCode
													+ '</td>';
											trHtml += '<td>'
													+ fead.payAccountNumber
													+ '</td>';
											trHtml += '<td>' + fead.ebAmount
													+ '</td>';
											trHtml += '<td>'
													+ formatDate(new Date(
															fead.tradeTime))
													+ '</td>';
											if (fead.status == 1) {
												trHtml += '<td>已付款</td>';
											} else if (fead.status == 2) {
												trHtml += '<td>撤销</td>';
											} else {
												trHtml += '<td></td>';
											}
											trHtml += '<td><a href="javascript:void(0);" onclick="linkOrder('
													+ fead.ebAccountDetailId
													+ ');">关联订单</a></td>';
											trHtml += '</tr>';
											$("#fead-table").append(trHtml);
										} else {
											var trHtml = '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
											$("#fead-table").append(trHtml);
											Common.messageBox("提示", data.msg,
													false);

										}
									}
								});
					});

	function formatDate(date) {
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var second = date.getSeconds();
		return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":"
				+ second;
	}
});
// linkOrder 关联订单
function linkOrder(ebAccountDetailId) {
	var orderInfoIds = $("#orderInfoIds").val();
	var params = {};
	params.ebAccountDetailId = ebAccountDetailId;
	params.orderInfoIds = orderInfoIds;

	$.ajax({
		type : "post",
		url : 'saveBatchLinkOrder',
		data : params,
		dataType : 'json',
		success : function(data) {

			if (data.status == "SUCCESS") {
				$("#fead-table tbody tr td").each(function() {
					$(this).html("");
				});
				var fead = data.fead;
				console.log(fead);
				if (fead != null) {
					
					var trHtml = '<tr>';
					trHtml += '<td>' + fead.orderInfoCode + '</td>';
					trHtml += '<td>' + fead.posTerminalCode + '</td>';
					trHtml += '<td>' + fead.tradeRefCode + '</td>';
					trHtml += '<td>' + fead.payAccountNumber + '</td>';
					trHtml += '<td>' + fead.ebAmount + '</td>';
					trHtml += '<td>' + fead.distributionAmount + '</td>';
					trHtml += '<td>' + fead.tradeTime
							+ '</td>';
					trHtml += '<td>已付款</td>';
					trHtml += '</tr>';
					$("#fd-fead-table").append(trHtml);
					Common.messageBox("提示", "关联成功！",false);
				}
			}else{
				Common.messageBox("提示", data.msg.msg,false);
			}
		}
	});
}