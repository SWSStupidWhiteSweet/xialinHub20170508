package xialinHub.com.module.test.img;

import java.awt.AlphaComposite;
import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

/*
 *作者:xialin
 *日期:2017年6月1日
 *时间:下午6:05:28
 **/
public class ImgTest {
	
      /**
        * 
        * @Title: 构造图片
        * @Description: 生成水印并返回java.awt.image.BufferedImage
        * @param file
        *            源文件(图片)
        * @param waterFile
        *            水印文件(图片)
        * @param x
        *            距离右下角的X偏移量
        * @param y
        *            距离右下角的Y偏移量
        * @param alpha
        *            透明度, 选择值从0.0~1.0: 完全透明~完全不透明
        * @return BufferedImage
        * @throws IOException
        */
       public static BufferedImage watermark(File file, File waterFile, int x, int y, float alpha) throws IOException {
           // 获取底图
           BufferedImage buffImg = ImageIO.read(file);
           // 获取层图
           BufferedImage waterImg = ImageIO.read(waterFile);
           // 创建Graphics2D对象，用在底图对象上绘图
           Graphics2D g2d = buffImg.createGraphics();
           int waterImgWidth = waterImg.getWidth();// 获取层图的宽度
           int waterImgHeight = waterImg.getHeight();// 获取层图的高度
           // 在图形和图像中实现混合和透明效果
           g2d.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_ATOP, alpha));
           // 绘制
           g2d.drawImage(waterImg, x, y, waterImgWidth, waterImgHeight, null);
           g2d.dispose();// 释放图形上下文使用的系统资源
           return buffImg;
       }
   
       /**
        * 输出水印图片
        * 
        * @param buffImg
        *            图像加水印之后的BufferedImage对象
        * @param savePath
        *            图像加水印之后的保存路径
        */
       private static void generateWaterFile(BufferedImage buffImg, String savePath) {
           int temp = savePath.lastIndexOf(".") + 1;
           try {
               ImageIO.write(buffImg, savePath.substring(temp), new File(savePath));
           } catch (IOException e1) {
               e1.printStackTrace();
           }
       }
   
       /**
        * 
        * @param args
        * @throws IOException
        */
       /*public static void main(String[] args) throws IOException {
           String sourceFilePath = "E://backgroud.jpg";
           String waterFilePath = "E://lufei.jpg";
           String saveFilePath = "E://new.jpg";
           // 构建叠加层
           BufferedImage buffImg = watermark(new File(sourceFilePath), new File(waterFilePath), 0, 0, .5f);
           // 输出水印图片
           generateWaterFile(buffImg, saveFilePath);
       }*/
       
       
       
       public static void main(String[] args) {  
           try{  
               StringBuffer sb = new StringBuffer();  
               sb.append("中华人民共和国\n");  
               sb.append("中华人民共和国\n");  
                 
               FileImageCreator creator = new FileImageCreator(new SimpleDrawer(), "e:\\img.jpg");  
               creator.setWidth(500); //图片宽度  
               creator.setHeight(200); //图片高度  
               creator.setLineNum(0); //干扰线条数  
               creator.setFontSize(18); //字体大小  
               creator.setFontName("黑体");  
                 
               //文字旋转  
//               creator.setRadian(30.0); //旋转弧度  
//               creator.setRotateX(creator.getWidth()/5);  
//               creator.setRotateY(creator.getHeight()*5/10);  
               creator.setBgColor(Color.WHITE);//设置背景色
               creator.setFontColor(Color.BLACK);
               
               creator.generateImage(sb.toString());  
                 
               System.out.println("ok");  
                 
           }catch(IOException ex){  
               ex.printStackTrace();  
           }  
       }
       
}
