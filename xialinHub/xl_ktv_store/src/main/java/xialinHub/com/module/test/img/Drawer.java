package xialinHub.com.module.test.img;

import java.awt.Graphics2D;

/*
 *作者:xialin
 *日期:2017年6月2日
 *时间:上午9:38:19
 **/
public interface Drawer {
	/** 
     * 在绘画板上绘制字符串 
     *  
     * @param creator 图片创建器对象 
     * @param g 绘画板 
     * @param text 待绘制的字符串 
     */  
    public void draw(AbstractImageCreator creator, Graphics2D g, String text);
}
