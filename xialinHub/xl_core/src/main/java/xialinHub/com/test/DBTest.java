package xialinHub.com.test;

import java.sql.ResultSet;
import java.sql.SQLException;

import xialinHub.com.util.DBHelper;

/*
 *作者:xialin
 *日期:2017年5月12日
 *时间:下午2:21:54
 **/
public class DBTest {
	
	static String sql = null;  
    static DBHelper db1 = null;  
    static ResultSet ret = null;
    
    public static void main(String[] args) {  
        sql = "select * from user";//SQL语句  
        db1 = new DBHelper(sql);//创建DBHelper对象  
  
        try {  
            ret = db1.pst.executeQuery();//执行语句，得到结果集  
            while (ret.next()) {  
                String uid = ret.getString(1);  
                String ufname = ret.getString(2);  
                String ulname = ret.getString(3);  
                String udate = ret.getString(4);  
                System.out.println(uid + "\t" + ufname + "\t" + ulname + "\t" + udate );  
            }//显示数据  
            ret.close();  
            db1.close();//关闭连接  
        } catch (SQLException e) {  
            e.printStackTrace();  
        }  
    } 
}
