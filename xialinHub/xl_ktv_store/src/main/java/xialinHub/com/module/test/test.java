package xialinHub.com.module.test;

import java.math.BigDecimal;
import java.util.ArrayList;  
import java.util.Collections;  
import java.util.Comparator;  
import java.util.HashMap;
import java.util.List;  
import java.util.Map;

import net.sf.json.JSONObject;
	  
public class test {  
  
    /*public static void main(String[] args) {  
    	String[] str = new String[]{"夏霖","18323788643"};
    	final String VERIFICATION_SELL_POINT = "尊敬的客户：您好，为了便于您在置业过程中享受更优质的服务，请对您的专属置业顾问（%s，%s）进行评价。 1 非常满意 2 满意 3 一般 4 不满意 回复对应数字完成评价。";
    	String ttt = String.format(VERIFICATION_SELL_POINT, str);
    	System.out.println(ttt);
    }*/ 
    
    /*public static void main(String[] args) {
		int i = 4;
		add(i);
		System.out.println(i);
	}
    
    public static void add(int i){
    	i+=2;
    }*/
    
    class User{
    	private String name;
    	private int id;
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		@Override
		public String toString() {
			return "User [name=" + name + ", id=" + id + "]";
		}
		
    }
    
    public static void main(String[] args) {
		User user =  null;
//		user.setId(1);
//		user.setName("xl");
//		System.out.println(user.toString());
		userChange(user);
		System.out.println(user.toString());
	}
    
    public static void userChange(test.User user){
    	if(user == null){
    		user = new test().new User();
    		user.setId(2);
    		user.setName("xl2");
    	}
    }
    
}
