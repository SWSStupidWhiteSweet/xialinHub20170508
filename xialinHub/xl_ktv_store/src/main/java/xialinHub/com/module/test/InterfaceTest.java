package com.ruiyun.wechat.test;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InvalidObjectException;
import java.io.OutputStreamWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.IIOException;

import net.sf.json.JSONObject;

public class InterfaceTest {

	public static void main(String[] args) throws Exception {
		
		System.out.println("执行开始时间：" + new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
		String httpUrl = "http://wap.yj.cn.com";
		String wxConfigId = "6";
		String userCacheId = "722CF8EC83D44C64A2265ED128C39E40";
		/*String userName = "18323788643";
		String password = "123456789";*/
		String page = "1";
		String number = "999";
		String requestUrl = "";
		String str = "";
		JSONObject json = null;
		List<Map<String,Object>> list = null;
		Map<String,String> paramMap = new HashMap<String, String>();
		File file = null;
		BufferedWriter writer = null;
		
		for(int i=90;i>80;i--){
			
			String fileName = "D:/returnFile/returnFile"+i+".json";
			file = new File(fileName);
			if(file.exists()){
				file.delete();
			}
			
			writer = 
					new BufferedWriter(
					new OutputStreamWriter(
							new FileOutputStream(file,true)));
			
			
			//-------------------------------电子楼书接口-------------------------------------			
			
			try{
				try{
					//获取城市接口
					requestUrl = httpUrl+"/wechat/brochure/getcityhavebuilding";
					str = HttpRequestClient.getResponse(requestUrl, null);
					System.out.println(requestUrl+":"+str);
					json = JSONObject.fromObject(str);
					json.put("requestUrl", requestUrl);
					str = json.toString();
					writer.write(str+"\r\n\r\n\r\n");
					writer.flush();				
				}/*catch(Exception e){
					System.out.println(e);
					JSONObject errorJson = new JSONObject();
					errorJson.put("errorMsg", e.getMessage() + "获取所有有楼盘的城市接口报错");
					writer.write(errorJson.toString()+"\r\n\r\n\r\n");
					writer.flush();
				}*/catch(InvalidObjectException e){
					
				}
		        
				String cityName = "";
				try{
					//获取城市下所有的楼盘期数
			        list = (List<Map<String,Object>>)json.get("result");
			        for(Map<String,Object> map : list){
			        	cityName = (String)map.get("cityName");
			        	paramMap.clear();
			        	paramMap.put("cityName", cityName);
			        	paramMap.put("page", page);
			        	paramMap.put("showNumber", number);
			        	requestUrl = httpUrl+"/wechat/brochure/getbuildinginfolist";
			        	str = HttpRequestClient.getResponse(requestUrl, paramMap);
			        	System.out.println(requestUrl+":"+str);
			        	json.clear();
			        	json = JSONObject.fromObject(str);
						json.put("requestUrl", requestUrl);
						
						str = json.toString();
						writer.write(str+"\r\n\r\n\r\n");
				        writer.flush(); 
						
				        String buildingInfoName = "";
				        String buildingInfoId = "";
				        try{
				        	//获取楼盘期数详情
							list = (List<Map<String,Object>>)json.get("result");
							for(Map<String,Object> map1 : list){
								buildingInfoId = String.valueOf(map1.get("buildingInfoId"));
								buildingInfoName = String.valueOf(map1.get("buildingInfoName"));
								requestUrl = httpUrl+"/wechat/brochure/getbuildinginfobyid";
								paramMap.clear();
								paramMap.put("buildingInfoId", buildingInfoId);
								paramMap.put("userCacheId", userCacheId);
								paramMap.put("wxConfigId", wxConfigId);
								str = HttpRequestClient.getResponse(requestUrl, paramMap);
								System.out.println(requestUrl+":"+str);
								json.clear();
					        	json = JSONObject.fromObject(str);
								json.put("requestUrl", requestUrl);
								
								str = json.toString();
								writer.write(str+"\r\n\r\n\r\n");
						        writer.flush();
						        
						        try{
						        	//获取配套信息
							        requestUrl = httpUrl+"/wechat/brochure/getbuildingmap";
							        paramMap.clear();
							        paramMap.put("buildingInfoId", buildingInfoId);
							        str = HttpRequestClient.getResponse(requestUrl, paramMap);
							        System.out.println(requestUrl+":"+str);
							        json.clear();
						        	json = JSONObject.fromObject(str);
									json.put("requestUrl", requestUrl);
									
									str = json.toString();
									writer.write(str+"\r\n\r\n\r\n");
							        writer.flush();
						        }catch(Exception e){
									System.out.println(e);
									JSONObject errorJson = new JSONObject();
									errorJson.put("errorMsg", e.getMessage() + "获取"+buildingInfoName+"-"+buildingInfoId+"配套信息接口报错");
									writer.write(errorJson.toString()+"\r\n\r\n\r\n");
									writer.flush();
						        }
						        
						        try{
						        	//获取楼书信息
							        requestUrl = httpUrl+"/wechat/brochure/getbrochureimg";
							        paramMap.clear();
							        paramMap.put("buildingInfoId", buildingInfoId);
							        str = HttpRequestClient.getResponse(requestUrl, paramMap);
							        System.out.println(requestUrl+":"+str);
							        json.clear();
						        	json = JSONObject.fromObject(str);
									json.put("requestUrl", requestUrl);
									
									str = json.toString();
									writer.write(str+"\r\n\r\n\r\n");
							        writer.flush();
						        }catch(Exception e){
									System.out.println(e);
									JSONObject errorJson = new JSONObject();
									errorJson.put("errorMsg", e.getMessage() + "获取"+buildingInfoName+"-"+buildingInfoId+"电子楼书信息接口报错");
									writer.write(errorJson.toString()+"\r\n\r\n\r\n");
									writer.flush();
									
						        }
						        
						        try{
						        	//获取相册信息
							        requestUrl = httpUrl+"/wechat/brochure/getbuildingphotos";
							        paramMap.clear();
							        paramMap.put("buildingInfoId", buildingInfoId);
							        str = HttpRequestClient.getResponse(requestUrl, paramMap);
							        System.out.println(requestUrl+":"+str);
							        json.clear();
						        	json = JSONObject.fromObject(str);
									json.put("requestUrl", requestUrl);
									
									str = json.toString();
									writer.write(str+"\r\n\r\n\r\n");
							        writer.flush();
						        }catch(Exception e){
									System.out.println(e);
									JSONObject errorJson = new JSONObject();
									errorJson.put("errorMsg", e.getMessage() + "获取"+buildingInfoName+"-"+buildingInfoId+"相册信息接口报错");
									writer.write(errorJson.toString()+"\r\n\r\n\r\n");
									writer.flush();
						        }
						        
						        try{
						        	//获取楼盘动态列表信息
							        requestUrl = httpUrl+"/wechat/brochure/getbuildingcontentlist";
							        paramMap.clear();
							        paramMap.put("buildingInfoId", buildingInfoId);
							        paramMap.put("page", page);
							        paramMap.put("number", number);
							        str = HttpRequestClient.getResponse(requestUrl, paramMap);
							        System.out.println(requestUrl+":"+str);
							        json.clear();
						        	json = JSONObject.fromObject(str);
									json.put("requestUrl", requestUrl);
									
									str = json.toString();
									writer.write(str+"\r\n\r\n\r\n");
							        writer.flush();
							        
							        String contentId = "";
							        try{
							        	//获取楼盘动态详情信息
								        list = (List<Map<String,Object>>)json.get("result");
								        for(Map<String,Object> map3 : list){
								        	contentId = String.valueOf(map3.get("contentId"));
								        	paramMap.clear();
								        	paramMap.put("contentId", contentId);
								        	requestUrl = httpUrl+"/wechat/brochure/getbuildingcontent";
								        	str = HttpRequestClient.getResponse(requestUrl, paramMap);
								        	System.out.println(requestUrl+":"+str);
								        	json.clear();
								        	json = JSONObject.fromObject(str);
											json.put("requestUrl", requestUrl);
											
											str = json.toString();
											writer.write(str+"\r\n\r\n\r\n");
									        writer.flush();
								        }
							        }catch(Exception e){
										System.out.println(e);
										JSONObject errorJson = new JSONObject();
										errorJson.put("errorMsg", e.getMessage() + "获取"+buildingInfoName+"-"+buildingInfoId+"楼盘下的"+contentId+"动态详情信息接口报错");
										writer.write(errorJson.toString()+"\r\n\r\n\r\n");
										writer.flush();
							        }
							        
						        }catch(Exception e){
									System.out.println(e);
									JSONObject errorJson = new JSONObject();
									errorJson.put("errorMsg", e.getMessage() + "获取"+buildingInfoName+"-"+buildingInfoId+"楼盘动态列表信息接口报错");
									writer.write(errorJson.toString()+"\r\n\r\n\r\n");
									writer.flush();
						        }
						        
						        try{
						        	//获取看房有礼活动信息
							        requestUrl = httpUrl+"/wechat/brochure/getactivity";
							        paramMap.clear();
							        paramMap.put("buildingInfoId", buildingInfoId);
									str = HttpRequestClient.getResponse(requestUrl, paramMap);
									System.out.println(requestUrl+":"+str);
									json = JSONObject.fromObject(str);
									json.put("requestUrl", requestUrl);
									
									str = json.toString();
									writer.write(str+"\r\n\r\n\r\n");
							        writer.flush();
						        }catch(Exception e){
									System.out.println(e);
									JSONObject errorJson = new JSONObject();
									errorJson.put("errorMsg", e.getMessage() + "获取"+buildingInfoName+"-"+buildingInfoId+"看房有礼活动信息接口报错");
									writer.write(errorJson.toString()+"\r\n\r\n\r\n");
									writer.flush();
						        }
						        
						        try{
						        	//获取户型列表以及套餐信息
							        requestUrl = httpUrl+"/wechat/brochure/gethouseandpackage";
							        paramMap.clear();
							        paramMap.put("buildingInfoId", buildingInfoId);
							        str = HttpRequestClient.getResponse(requestUrl, paramMap);
							        System.out.println(requestUrl+":"+str);
							        json.clear();
						        	json = JSONObject.fromObject(str);
									json.put("requestUrl", requestUrl);
									
									str = json.toString();
									writer.write(str+"\r\n\r\n\r\n");
							        writer.flush();
						        }catch(Exception e){
									System.out.println(e);
									JSONObject errorJson = new JSONObject();
									errorJson.put("errorMsg", e.getMessage() + "获取"+buildingInfoName+"-"+buildingInfoId+"户型列表以及套餐信息接口报错");
									writer.write(errorJson.toString()+"\r\n\r\n\r\n");
									writer.flush();
									
						        }
						       
						        try{
						        	 //获取楼盘户型列表
							        requestUrl = httpUrl+"/wechat/brochure/searchapartments";
							        paramMap.clear();
									paramMap.put("buildingInfoId", buildingInfoId);
									paramMap.put("page", page);
						        	paramMap.put("number", number);
									str = HttpRequestClient.getResponse(requestUrl, paramMap);
									System.out.println(requestUrl+":"+str);
									json.clear();
						        	json = JSONObject.fromObject(str);
									json.put("requestUrl", requestUrl);
									
									str = json.toString();
									writer.write(str+"\r\n\r\n\r\n");
							        writer.flush();
							        
							        String houseId = "";
							        try{
							        	//获取户型详情
								        list = (List<Map<String,Object>>)json.get("result");
								        for(Map<String,Object> map2 : list){
								        	houseId = String.valueOf(map2.get("houseId"));
								        	paramMap.clear();
								        	paramMap.put("buildingInfoId", buildingInfoId);
								        	paramMap.put("houseId", houseId);
								        	requestUrl = httpUrl+"/wechat/brochure/getapartmentinfo";
								        	str = HttpRequestClient.getResponse(requestUrl, paramMap);
								        	System.out.println(requestUrl+":"+str);
								        	json.clear();
								        	json = JSONObject.fromObject(str);
											json.put("requestUrl", requestUrl);
											
											str = json.toString();
											writer.write(str+"\r\n\r\n\r\n");
									        writer.flush();
								        }
							        }catch(Exception e){
										System.out.println(e);
										JSONObject errorJson = new JSONObject();
										errorJson.put("errorMsg", e.getMessage() + "获取"+buildingInfoName+"-"+buildingInfoId+"楼盘下的"+houseId+"户型详情接口报错");
										writer.write(errorJson.toString()+"\r\n\r\n\r\n");
										writer.flush();
							        }
							        
						        }catch(Exception e){
									System.out.println(e);
									JSONObject errorJson = new JSONObject();
									errorJson.put("errorMsg", e.getMessage() + "获取楼盘"+buildingInfoName+"-"+buildingInfoId+"户型列表接口报错");
									writer.write(errorJson.toString()+"\r\n\r\n\r\n");
									writer.flush();
						        }
							}
				        }catch(Exception e){
							System.out.println(e);
							JSONObject errorJson = new JSONObject();
							errorJson.put("errorMsg", e.getMessage() + "获取"+buildingInfoName+"-"+buildingInfoId+"楼盘期数详情接口报错");
							writer.write(errorJson.toString()+"\r\n\r\n\r\n");
							writer.flush();
				        }
			        }
				}catch(Exception e){
					System.out.println(e);
					JSONObject errorJson = new JSONObject();
					errorJson.put("errorMsg", e.getMessage() + "获取"+cityName+"城市下所有的楼盘期数接口报错");
					writer.write(errorJson.toString()+"\r\n\r\n\r\n");
					writer.flush();
				}
		        
		        try{
		        	//贷款申请的工作职业列表
			        requestUrl = httpUrl+"/wechat/brochure/getcareertype";
					str = HttpRequestClient.getResponse(requestUrl, null);
					System.out.println(requestUrl+":"+str);
					json = JSONObject.fromObject(str);
					json.put("requestUrl", requestUrl);
					
					str = json.toString();
					writer.write(str+"\r\n\r\n\r\n");
			        writer.flush();
		        }catch(Exception e){
					System.out.println(e);
					JSONObject errorJson = new JSONObject();
					errorJson.put("errorMsg", e.getMessage() + "贷款申请的工作职业列表接口报错");
					writer.write(errorJson.toString()+"\r\n\r\n\r\n");
					writer.flush();
		        }
		         
		        try{
		        	//获取贷款申请的单位性质列表
			        requestUrl = httpUrl+"/wechat/brochure/getcompanytype";
					str = HttpRequestClient.getResponse(requestUrl, null);
					System.out.println(requestUrl+":"+str);
					json = JSONObject.fromObject(str);
					json.put("requestUrl", requestUrl);
					
					str = json.toString();
					writer.write(str+"\r\n\r\n\r\n");
			        writer.flush(); 
		        }catch(Exception e){
					System.out.println(e);
					JSONObject errorJson = new JSONObject();
					errorJson.put("errorMsg", e.getMessage() + "获取贷款申请的单位性质列表接口报错");
					writer.write(errorJson.toString()+"\r\n\r\n\r\n");
					writer.flush();
		        }
		        
		        
		        try{
		        	 //获取贷款申请的置业用途列表
			        requestUrl = httpUrl+"/wechat/brochure/gethouseuse";
					str = HttpRequestClient.getResponse(requestUrl, null);
					System.out.println(requestUrl+":"+str);
					json = JSONObject.fromObject(str);
					json.put("requestUrl", requestUrl);
					
					str = json.toString();
					writer.write(str+"\r\n\r\n\r\n");
			        writer.flush();
		        }catch(Exception e){
					System.out.println(e);
					JSONObject errorJson = new JSONObject();
					errorJson.put("errorMsg", e.getMessage() + "获取贷款申请的置业用途列表接口报错");
					writer.write(errorJson.toString()+"\r\n\r\n\r\n");
					writer.flush();
		        }
		        
		        try{
		        	//获取贷款申请的户籍性质列表
			        requestUrl = httpUrl+"/wechat/brochure/getcensusproperties";
					str = HttpRequestClient.getResponse(requestUrl, null);
					System.out.println(requestUrl+":"+str);
					json = JSONObject.fromObject(str);
					json.put("requestUrl", requestUrl);
					
					str = json.toString();
					writer.write(str+"\r\n\r\n\r\n");
			        writer.flush();
		        }catch(Exception e){
					System.out.println(e);
					JSONObject errorJson = new JSONObject();
					errorJson.put("errorMsg", e.getMessage() + "获取贷款申请的户籍性质列表接口报错");
					writer.write(errorJson.toString()+"\r\n\r\n\r\n");
					writer.flush();
		        }
		        
		        try{
		        	//获取贷款申请的户籍性质列表
			        requestUrl = httpUrl+"/wechat/brochure/getcensusproperties";
					str = HttpRequestClient.getResponse(requestUrl, null);
					System.out.println(requestUrl+":"+str);
					json = JSONObject.fromObject(str);
					json.put("requestUrl", requestUrl);
					
					str = json.toString();
					writer.write(str+"\r\n\r\n\r\n");
			        writer.flush();
		        }catch(Exception e){
					System.out.println(e);
					JSONObject errorJson = new JSONObject();
					errorJson.put("errorMsg", e.getMessage() + "获取贷款申请的户籍性质列表接口报错");
					writer.write(errorJson.toString()+"\r\n\r\n\r\n");
					writer.flush();
		        }
		        
		        try{
		        	//获取贷款申请的相关类表数据
			        requestUrl = httpUrl+"/wechat/brochure/getaboutapplyinfo";
					str = HttpRequestClient.getResponse(requestUrl, null);
					System.out.println(requestUrl+":"+str);
					json = JSONObject.fromObject(str);
					json.put("requestUrl", requestUrl);
					
					str = json.toString();
					writer.write(str+"\r\n\r\n\r\n");
			        writer.flush();
		        }catch(Exception e){
					System.out.println(e);
					JSONObject errorJson = new JSONObject();
					errorJson.put("errorMsg", e.getMessage() + "获取贷款申请的相关类表数据接口报错");
					writer.write(errorJson.toString()+"\r\n\r\n\r\n");
					writer.flush();
		        }
		        
		        
	//----------------------------------个人中心接口------------------------------------------	        
		        
		        try{
		        	//获取'我的团购'列表 
			        requestUrl = httpUrl+"/wechat/member/getmysignuplist";
			        paramMap.clear();
			        paramMap.put("userCacheId", userCacheId);
			        paramMap.put("page", page);
			        paramMap.put("number", number);
					str = HttpRequestClient.getResponse(requestUrl, paramMap);
					System.out.println(requestUrl+":"+str);
					json = JSONObject.fromObject(str);
					json.put("requestUrl", requestUrl);
					
					str = json.toString();
					writer.write(str+"\r\n\r\n\r\n");
			        writer.flush();
			        
			        String tenpayId = "";
			        try{
			        	//获取我的团购详情
				        list = (List<Map<String,Object>>)json.get("result");
				        for(Map<String,Object> map : list){
				        	tenpayId = String.valueOf(map.get("tenpayId"));
				        	paramMap.clear();
				        	paramMap.put("userCacheId", userCacheId);
				        	paramMap.put("thirdparTenpayId", tenpayId);
				        	requestUrl = httpUrl+"/wechat/member/signinfo";
				        	str = HttpRequestClient.getResponse(requestUrl, paramMap);
				        	System.out.println(requestUrl+":"+str);
							json = JSONObject.fromObject(str);
							json.put("requestUrl", requestUrl);
							
							str = json.toString();
							writer.write(str+"\r\n\r\n\r\n");
					        writer.flush();
				        }
			        }catch(Exception e){
						System.out.println(e);
						JSONObject errorJson = new JSONObject();
						errorJson.put("errorMsg", e.getMessage() + "获取我的团购"+tenpayId+"的详情接口报错");
						writer.write(errorJson.toString()+"\r\n\r\n\r\n");
						writer.flush();
			        }
			        
		        }catch(Exception e){
					System.out.println(e);
					JSONObject errorJson = new JSONObject();
					errorJson.put("errorMsg", e.getMessage() + "获取我的团购列表接口报错");
					writer.write(errorJson.toString()+"\r\n\r\n\r\n");
					writer.flush();
		        }
		        
		        try{
		        	//获取会员信息
			        requestUrl = httpUrl+"/wechat/member/getmemberinfo";
			        paramMap.clear();
			        paramMap.put("userCacheId", userCacheId);
					str = HttpRequestClient.getResponse(requestUrl, paramMap);
					System.out.println(requestUrl+":"+str);
					json = JSONObject.fromObject(str);
					json.put("requestUrl", requestUrl);
					
					str = json.toString();
					writer.write(str+"\r\n\r\n\r\n");
			        writer.flush();
		        }catch(Exception e){
					System.out.println(e);
					JSONObject errorJson = new JSONObject();
					errorJson.put("errorMsg", e.getMessage() + "获取会员信息接口报错");
					writer.write(errorJson.toString()+"\r\n\r\n\r\n");
					writer.flush();
		        }
		        
		        try{
		        	//获取投诉记录列表
			        requestUrl = httpUrl+"/wechat/member/getmembercomplainlist";
			        paramMap.clear();
			        paramMap.put("userCacheId", userCacheId);
			        paramMap.put("page", page);
			        paramMap.put("number", number);
					str = HttpRequestClient.getResponse(requestUrl, paramMap);
					System.out.println(requestUrl+":"+str);
					json = JSONObject.fromObject(str);
					json.put("requestUrl", requestUrl);
					
					str = json.toString();
					writer.write(str+"\r\n\r\n\r\n");
			        writer.flush();
			        
			        String complainId = "";
			        try{
			        	//获取投诉详情
					    list = (List<Map<String,Object>>)json.get("result");
				        for(Map<String,Object> map : list){
				        	complainId = String.valueOf(map.get("complainId"));
				        	paramMap.clear();
				        	paramMap.put("userCacheId", userCacheId);
				        	paramMap.put("complainId", complainId);
				        	requestUrl = httpUrl+"/wechat/member/getcomplainInfo";
				        	str = HttpRequestClient.getResponse(requestUrl, paramMap);
				        	System.out.println(requestUrl+":"+str);
							json = JSONObject.fromObject(str);
							json.put("requestUrl", requestUrl);
							
							str = json.toString();
							writer.write(str+"\r\n\r\n\r\n");
					        writer.flush();
				        }
				        
			        }catch(Exception e){
						System.out.println(e);
						JSONObject errorJson = new JSONObject();
						errorJson.put("errorMsg", e.getMessage() + "获取"+complainId+"投诉详情接口报错");
						writer.write(errorJson.toString()+"\r\n\r\n\r\n");
						writer.flush();
			        }
			        
		        }catch(Exception e){
					System.out.println(e);
					JSONObject errorJson = new JSONObject();
					errorJson.put("errorMsg", e.getMessage() + "获取投诉记录列表接口报错");
					writer.write(errorJson.toString()+"\r\n\r\n\r\n");
					writer.flush();
		        }
		        
		        try{
		        	//获取我的收藏
			        requestUrl = httpUrl+"/wechat/member/getmycollectionlist";
			        paramMap.clear();
			        paramMap.put("userCacheId", userCacheId);
			        paramMap.put("collectionType", "1");
			        paramMap.put("page", page);
			        paramMap.put("number", number);
					str = HttpRequestClient.getResponse(requestUrl, paramMap);
					System.out.println(requestUrl+":"+str);
					json = JSONObject.fromObject(str);
					json.put("requestUrl", requestUrl);
					
					str = json.toString();
					writer.write(str+"\r\n\r\n\r\n");
			        writer.flush();
		        }catch(Exception e){
					System.out.println(e);
					JSONObject errorJson = new JSONObject();
					errorJson.put("errorMsg", e.getMessage() + "获取我的收藏接口报错");
					writer.write(errorJson.toString()+"\r\n\r\n\r\n");
					writer.flush();
		        }
		        
		        try{
		        	//获取我的预约看房
			        requestUrl = httpUrl+"/wechat/member/getmyreservations";
			        paramMap.clear();
			        paramMap.put("userCacheId", userCacheId);
			        paramMap.put("page", page);
			        paramMap.put("number", number);
					str = HttpRequestClient.getResponse(requestUrl, paramMap);
					System.out.println(requestUrl+":"+str);
					json = JSONObject.fromObject(str);
					json.put("requestUrl", requestUrl);
					
					str = json.toString();
					writer.write(str+"\r\n\r\n\r\n");
			        writer.flush();
		        }catch(Exception e){
					System.out.println(e);
					JSONObject errorJson = new JSONObject();
					errorJson.put("errorMsg", e.getMessage() + "获取我的预约看房接口报错");
					writer.write(errorJson.toString()+"\r\n\r\n\r\n");
					writer.flush();
		        }
		        
		        try{
		        	//获取我的看房有礼
			        requestUrl = httpUrl+"/wechat/member/getmyactivity";
			        paramMap.clear();
			        paramMap.put("userCacheId", userCacheId);
			        paramMap.put("page", page);
			        paramMap.put("number", number);
					str = HttpRequestClient.getResponse(requestUrl, paramMap);
					System.out.println(requestUrl+":"+str);
					json = JSONObject.fromObject(str);
					json.put("requestUrl", requestUrl);
					
					str = json.toString();
					writer.write(str+"\r\n\r\n\r\n");
			        writer.flush();
		        }catch(Exception e){
					System.out.println(e);
					JSONObject errorJson = new JSONObject();
					errorJson.put("errorMsg", e.getMessage() + "获取我的看房有礼接口报错");
					writer.write(errorJson.toString()+"\r\n\r\n\r\n");
					writer.flush();
		        }
		        
		        
		        try{
		        	//获取我的订单列表
			        requestUrl = httpUrl+"/wechat/member/getmyorderinfo";
			        paramMap.clear();
			        paramMap.put("userCacheId", userCacheId);
			        paramMap.put("page", page);
			        paramMap.put("number", number);
					str = HttpRequestClient.getResponse(requestUrl, paramMap);
					System.out.println(requestUrl+":"+str);
					json = JSONObject.fromObject(str);
					json.put("requestUrl", requestUrl);
					
					str = json.toString();
					writer.write(str+"\r\n\r\n\r\n");
			        writer.flush();
			        
			        String orderInfoId = "";
			        try{
			        	//获取订单详情
				        list = (List<Map<String,Object>>)json.get("result");
				        for(Map<String,Object> map : list){
				        	orderInfoId = String.valueOf(map.get("orderInfoId"));
				        	paramMap.clear();
				        	paramMap.put("userCacheId", userCacheId);
				        	paramMap.put("orderInfoId", orderInfoId);
				        	requestUrl = httpUrl+"/wechat/member/getorderinfo";
				        	str = HttpRequestClient.getResponse(requestUrl, paramMap);
				        	System.out.println(requestUrl+":"+str);
							json = JSONObject.fromObject(str);
							json.put("requestUrl", requestUrl);
							
							str = json.toString();
							writer.write(str+"\r\n\r\n\r\n");
					        writer.flush();
				        }
			        }catch(Exception e){
						System.out.println(e);
						JSONObject errorJson = new JSONObject();
						errorJson.put("errorMsg", e.getMessage() + "获取"+orderInfoId+"订单详情接口报错");
						writer.write(errorJson.toString()+"\r\n\r\n\r\n");
						writer.flush();
			        }
			        
		        }catch(Exception e){
					System.out.println(e);
					JSONObject errorJson = new JSONObject();
					errorJson.put("errorMsg", e.getMessage() + "获取我的订单列表接口报错");
					writer.write(errorJson.toString()+"\r\n\r\n\r\n");
					writer.flush();
		        }
		        
		        try{
		        	//获取我的优惠早知道
			        requestUrl = httpUrl+"/wechat/member/getmybuildingactivity";
			        paramMap.clear();
			        paramMap.put("userCacheId", userCacheId);
			        paramMap.put("wxConfigId", wxConfigId);
			        paramMap.put("page", page);
			        paramMap.put("number", number);
					str = HttpRequestClient.getResponse(requestUrl, paramMap);
					System.out.println(requestUrl+":"+str);
					json = JSONObject.fromObject(str);
					json.put("requestUrl", requestUrl);
					
					str = json.toString();
					writer.write(str+"\r\n\r\n\r\n");
			        writer.flush();
		        }catch(Exception e){
					System.out.println(e);
					JSONObject errorJson = new JSONObject();
					errorJson.put("errorMsg", e.getMessage() + "获取我的优惠早知道接口报错");
					writer.write(errorJson.toString()+"\r\n\r\n\r\n");
					writer.flush();
		        }
		        
		        try{
		        	//获取会员扩展信息
			        requestUrl = httpUrl+"/wechat/member/getmemberinfoext";
			        paramMap.clear();
			        paramMap.put("userCacheId", userCacheId);
					str = HttpRequestClient.getResponse(requestUrl, paramMap);
					System.out.println(requestUrl+":"+str);
					json = JSONObject.fromObject(str);
					json.put("requestUrl", requestUrl);
					
					str = json.toString();
					writer.write(str+"\r\n\r\n\r\n");
			        writer.flush();
		        }catch(Exception e){
					System.out.println(e);
					JSONObject errorJson = new JSONObject();
					errorJson.put("errorMsg", e.getMessage() + "获取会员扩展信息接口报错");
					writer.write(errorJson.toString()+"\r\n\r\n\r\n");
					writer.flush();
		        }
		        
		        System.out.println("执行结束时间：" + new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date())); 
			}catch(Exception e){
				System.out.println("异常时间：" + new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
				e.printStackTrace();
				System.out.println(e.getMessage());
				JSONObject errorJson = new JSONObject();
				errorJson.put("errorMsg", e.getMessage());
				writer.write(errorJson.toString()+"\r\n\r\n\r\n");
				writer.flush();
			}finally{
				 if(writer!=null)writer.close();     
			}
			
		}
	}



}
