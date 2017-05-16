package com.ruiyun.wechat.test;

public class 加减乘除法计算 {
	
	public static String 整数的加法运算(int 加数, int 被加数){
		int 和 = 加数 + 被加数;
		return "整数的加法运算: " + 加数 + " + " + 被加数 + " = " + 和;
	}
	
	public static String 整数的减法运算(int 减数, int 被减数){
		int 差 = 减数 - 被减数;
		return "整数的减法运算: " + 减数 + " - " + 被减数 + " = " + 差;
	}
	
	public static String 整数的乘法运算(int 因子1, int 因子2){
		int 积 = 因子1 * 因子2;
		return "整数的乘法运算: " + 因子1 + " * " + 因子2 + " = " + 积; 
	}
	
	public static String 整数的除法运算(int 除数, int 被除数){
		double 商 = 除数 / 被除数;
		return "整数的除法运算: " + 除数 + " / " + 被除数 + " = " + 商; 
	}

	public static void 在控制台输出一句话(String 在控制台要输出的话){
		System.out.println(在控制台要输出的话);
	}
	
	public static void main(String[] args) {
		int 参数1 = 20;
		int 参数2 = 3;
		在控制台输出一句话(整数的加法运算(参数1, 参数2));
		在控制台输出一句话(整数的减法运算(参数1, 参数2));
		在控制台输出一句话(整数的乘法运算(参数1, 参数2));
		在控制台输出一句话(整数的除法运算(参数1, 参数2));
	}
	
}
