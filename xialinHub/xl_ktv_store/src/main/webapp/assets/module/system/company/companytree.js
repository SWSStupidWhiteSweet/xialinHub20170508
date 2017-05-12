/**
 * 
 */
/** **************************************构造tree start *************************************** */
// 渲染树结构
initTree({
	treeId : "tree",
	url : "getcompanytree",
	title : "公司结构",
	data : {
		parentId : 0
	}
});
/** **************************************构造tree end *************************************** */

var CONSTANT_TREENODE = "treeNode_";
var CONSTANT_CLASS_TREE_SELECTED = "tree-selected";
var CONSTANT_TREENODE_TOP = "treeNode_top";
var CONSTANT_ROOTNODEID = "treeNode_0";

function initTree(options) {
	if (!Common.isEmpty(options.url)) {
		$.ajax({
			url : options.url,
			dataType : "json",
			type : "post",
			data : options.data,
			success : function(json) {
				createTree(options, json);

				$(document).ready(function() {
					$(".tree-item").click(function() {
						var $this = $(this);
						// 移除所有选中样式
						$(".tree-item").removeClass(CONSTANT_CLASS_TREE_SELECTED);
						// 当前选中
						$this.addClass(CONSTANT_CLASS_TREE_SELECTED);

						// 刷新列表
						if ($this.attr("id").indexOf("merchant") >= 0 || $this.attr("id") === CONSTANT_TREENODE + "0") {
						} else {
							// 刷新列表
							Common.jqGridReload("grid-table", {
								"parentId" : $this.attr("id").split("_")[2]
							});
						}
					});
				});
			},
			error : function() {
				createTree(options, {});
			}
		});
	} else {
		createTree(options, {});
	}
}

function createTree(options, json) {
	var treeDiv = $("#" + options.treeId);
	var treeHeight = treeDiv.height();
	// 构造树的主面板
	treeDiv.html("<div class=\"widget-box widget-color-blue2\" id=\"treePanel\" style=\"margin:1px 0;\"></div>");
	// 取得树主面板jquery对象
	var treeBody = $("#treePanel");
	// 添加树的标题和内容面版
	treeBody.html("<div class=\"widget-header\" style=\"background-color:#307ecc\"><h4 class=\"widget-title lighter smaller\">" + options.title + "</h4></div><div class=\"widget-body\" style=\"height:" + treeHeight + "px;overflow: hidden;overflow-y: auto;\"><div class=\"widget-main padding-8\"><div class=\"tree tree-folder-select tree-selectable\" style=\"overflow-y: hidden;\" id=\"treeBody\"></div></div></div>");
	
	// 构造数结构
	var html = createNode(json);
	
	$("#treeBody").html(html);
}

function createNode(json) {
	// 初使化节点信息
	var html = "<div class=\"tree-folder-content\">";

	for (var i = 0; i < json.length; i++) {
		var nodeJson = json[i];
		if (null == nodeJson.children || nodeJson.children.length <= 0) {
			// 该节点下没有子节点，tree-folder-content表示无子节点
			html += createLeafNode(nodeJson.id, nodeJson.parentId, nodeJson.text);
		} else {
			// 该节点下有子节点，tree-folder表示有子节点
			html += "<div class=\"tree-folder\" style=\"display: block;\">"
					+ createLeafNode(nodeJson.id, nodeJson.parentId, nodeJson.text);
			html += createNode(nodeJson.children);
			html += "</div>";
		}
	}

	html += "</div>";

	return html;
}

function createLeafNode(nodeId, parentId, nodeName) {
	var html = "<div id=\"" + CONSTANT_TREENODE + nodeId + "\" parentId=\"" + CONSTANT_TREENODE + parentId
			+ "\" class=\"tree-item\" style=\"display: block;\"><div class=\"tree-item-name\">" + nodeName + "</div></div>";
	return html;
}

function setPermissionByJson(json) {
	// step1:取消所有权限
	$("." + CONSTANT_CLASS_TREE_SELECTED).removeClass(CONSTANT_CLASS_TREE_SELECTED);

	// step2:设置
	if (json.length <= 0)
		return false;

	for (var i = 0; i < json.length; i++) {
		var treeNodeId = "#" + CONSTANT_TREENODE + json[i].menuId.trim();

		var $treeNode = $(treeNodeId);
		if (typeof $treeNode.attr("id") == "undefined") {
			$("." + CONSTANT_CLASS_TREE_SELECTED).removeClass(CONSTANT_CLASS_TREE_SELECTED);
			Common.messageBox("提示", "传入的节点信息不正确！", false, 2000);
			return false;
		}
		unionUp($treeNode, true);
		// unionDown($treeNode, true);
	}
}

/**
 * 获取已勾选权限
 */
function getMerchantSelectedPermission() {
	var allSelectedTreeNodes = $("." + CONSTANT_CLASS_TREE_SELECTED);
	var treeNodeIds = "";

	for (var i = 0; i < allSelectedTreeNodes.length; i++) {
		var nodeId = $(allSelectedTreeNodes[i]).attr("id");
		if (nodeId == CONSTANT_ROOTNODEID)
			continue; // 根节点不弄进去

		nodeId = nodeId.split("_")[1];

		treeNodeIds += nodeId + ",";
	}
	// 去掉最后一个逗号
	if (treeNodeIds.length > 0) {
		treeNodeIds = treeNodeIds.substring(0, treeNodeIds.length - 1);
	}

	return treeNodeIds;
}