/**
 * 
 */
/** **************************************构造tree start *************************************** */
// 渲染树结构
initTree({
	treeId : "tree",
	url : "getmenutree",
	title : "权限树",
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
				
				$(document).ready(function(){
					$(".tree-item").click(function(){
						var $this = $(this);
						
						var isChecked = !($this.attr("class").indexOf(CONSTANT_CLASS_TREE_SELECTED) >= 0);
						
						unionUp($this, isChecked);
						unionDown($this, isChecked);
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
			html += createLeafNode(nodeJson.menuId, nodeJson.parentId, nodeJson.text);
		} else {
			// 该节点下有子节点，tree-folder表示有子节点
			html += "<div class=\"tree-folder\" style=\"display: block;\">" + createLeafNode(nodeJson.menuId, nodeJson.parentId, nodeJson.text);
			html += createNode(nodeJson.children);
			html += "</div>";
		}
	}
	
	html += "</div>";
	
	return html;
}

function createLeafNode(nodeId, parentId, nodeName) {
	var html = "<div id=\"" + CONSTANT_TREENODE + nodeId + "\" parentId=\"" + CONSTANT_TREENODE + parentId + "\" class=\"tree-item\" style=\"display: block;\"><i class=\" ace-icon ace-icon fa fa-check\"></i><div class=\"tree-item-name\">" + nodeName + "</div></div>";
	return html;
}

/**
 * 向上级联
 * @param $obj
 */
function unionUp($obj, isChecked) {
	var parentId = $obj.attr("parentId");
	
	if (isChecked) {
		$obj.addClass(CONSTANT_CLASS_TREE_SELECTED); // 自己改变
		
		// 向上查找
		while (parentId != CONSTANT_TREENODE + "top") {
			$("#" + parentId).addClass(CONSTANT_CLASS_TREE_SELECTED);
			parentId = $("#" + parentId).attr("parentId");
		}
	} else {
		// 如果同级的还有选中的，则向上不做任何操作
		$obj.removeClass(CONSTANT_CLASS_TREE_SELECTED); // 自己改变
		
		// 判断同级还有没有选中的
		// step1 :查找同级
		var chk = false;
		for (var i = 0; i < $("div[parentId=" + parentId + "]").length; i++) {
			if ($($("div[parentId=" + parentId + "]")[i]).attr("class").indexOf(CONSTANT_CLASS_TREE_SELECTED) >= 0) {
				// 同级还有选中的
				chk = true;
				break;
			}
		}
		
		if (!chk && parentId != CONSTANT_TREENODE_TOP) {
			unionUp($("#" + parentId), isChecked);
		}
	}
}

/**
 * 向下级联
 * @param $obj
 * @param isChecked
 */
function unionDown($obj, isChecked) {
	// 下向查找
	var nodeId = $obj.attr("id");
	for (var i = 0; i < $("div[parentId=" + nodeId + "]").length; i++) {
		if (isChecked) {
			$($("div[parentId=" + nodeId + "]")[i]).addClass(CONSTANT_CLASS_TREE_SELECTED);
		} else {
			$($("div[parentId=" + nodeId + "]")[i]).removeClass(CONSTANT_CLASS_TREE_SELECTED);
		}
		
		unionDown($($("div[parentId=" + nodeId + "]")[i]), isChecked);
	}
}

/**
 * 勾选已有权限
 */
function setPermissionByString(nodeIds) {
	// step1:取消所有权限
	$("." + CONSTANT_CLASS_TREE_SELECTED).removeClass(CONSTANT_CLASS_TREE_SELECTED);
	
	// step2:设置
	if (nodeIds.length <= 0) return false;
	
	var nodeArray = nodeIds.split(",");
	
	for (var i = 0; i < nodeArray.length; i++) {
		var treeNodeId = "#" + CONSTANT_TREENODE + nodeArray[i].trim();
		
		var $treeNode = $(treeNodeId);
		if (typeof $treeNode.attr("id") == "undefined") {
			$("." + CONSTANT_CLASS_TREE_SELECTED).removeClass(CONSTANT_CLASS_TREE_SELECTED);
			Common.messageBox("提示", "传入的节点信息不正确！", false, 2000);
			return false;
		}
		unionUp($treeNode, true);
		unionDown($treeNode, true);
	}
}

function setPermissionByJson(json) {
	// step1:取消所有权限
	$("." + CONSTANT_CLASS_TREE_SELECTED).removeClass(CONSTANT_CLASS_TREE_SELECTED);
	
	// step2:设置
	if (json.length <= 0) return false;
	
	for (var i = 0; i < json.length; i++) {
		var treeNodeId = "#" + CONSTANT_TREENODE + json[i].menuId.trim();
		
		var $treeNode = $(treeNodeId);
		if (typeof $treeNode.attr("id") == "undefined") {
			$("." + CONSTANT_CLASS_TREE_SELECTED).removeClass(CONSTANT_CLASS_TREE_SELECTED);
			Common.messageBox("提示", "传入的节点信息不正确！", false, 2000);
			return false;
		}
		unionUp($treeNode, true);
//		unionDown($treeNode, true);
	}
}

/**
 * 获取已勾选权限
 */
function getPermission() {
	var allSelectedTreeNodes = $("." + CONSTANT_CLASS_TREE_SELECTED);
	var treeNodeIds = "";
	
	for (var i = 0; i < allSelectedTreeNodes.length; i++) {
		var nodeId = $(allSelectedTreeNodes[i]).attr("id");
		if (nodeId == CONSTANT_ROOTNODEID) continue; // 根节点不弄进去
		
		nodeId = nodeId.split("_")[1];
		
		treeNodeIds += nodeId + ",";
	}
	// 去掉最后一个逗号
	if (treeNodeIds.length > 0) {
		treeNodeIds = treeNodeIds.substring(0, treeNodeIds.length - 1);
	}

	return treeNodeIds;
}