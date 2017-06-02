package xialinHub.com.module.test.img;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.URL;

import javax.imageio.ImageIO;

/**
 * 把两张图片合并
 * 
 * @author lizhiyong
 * @version $Id: Pic.java, v 0.1 2015-6-3 下午3:21:23 1111 Exp $
 */
public class Pic {
	private Font font = new Font("宋体", Font.BOLD, 16); // 添加字体的属性设置

	private Graphics2D g = null;

	private int fontsize = 16;

	private int x = 0;

	private int y = 0;

	/**
	 * 导入本地图片到缓冲区
	 */
	public BufferedImage loadImageLocal(String imgName) {
		try {
			return ImageIO.read(new File(imgName));
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}
		return null;
	}

	/**
	 * 导入网络图片到缓冲区
	 */
	public BufferedImage loadImageUrl(String imgName) {
		try {
			URL url = new URL(imgName);
			return ImageIO.read(url);
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}
		return null;
	}

	/**
	 * 生成新图片到本地
	 */
	public void writeImageLocal(String newImage, BufferedImage img) {
		if (newImage != null && img != null) {
			try {
				File outputfile = new File(newImage);
				ImageIO.write(img, "jpg", outputfile);
			} catch (IOException e) {
				System.out.println(e.getMessage());
			}
		}
	}

	/**
	 * 设定文字的字体等
	 */
	public void setFont(String fontStyle, int fontSize) {
		this.fontsize = fontSize;
		this.font = new Font(fontStyle, Font.PLAIN, fontSize);
	}

	/**
	 * 修改图片,返回修改后的图片缓冲区（只输出一行文本）
	 */
	public BufferedImage modifyImage(BufferedImage img, Object content, int x,
			int y) {

		try {
			int w = img.getWidth();
			int h = img.getHeight();
			g = img.createGraphics();
			g.setBackground(Color.WHITE);
			g.setColor(Color.WHITE);// 设置字体颜色
			if (this.font != null) {
				g.setFont(this.font);
			}
			// 验证输出位置的纵坐标和横坐标
			if (x >= h || y >= w) {
				this.x = h - this.fontsize + 2;
				this.y = w;
			} else {
				this.x = x;
				this.y = y;
			}
			if (content != null) {
				g.drawString(content.toString(), this.x, this.y);
			}
			g.dispose();
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		return img;
	}

	/**
	 * 修改图片,返回修改后的图片缓冲区（输出多个文本段） xory：true表示将内容在一行中输出；false表示将内容多行输出
	 */
	public BufferedImage modifyImage(BufferedImage img, Object[] contentArr,
			int x, int y, boolean xory) {
		try {
			int w = img.getWidth();
			int h = img.getHeight();
			g = img.createGraphics();
			g.setBackground(Color.BLACK);
			g.setColor(Color.BLACK);
			if (this.font != null) {
				g.setFont(this.font);
			}
			// 验证输出位置的纵坐标和横坐标
			if (x >= h || y >= w) {
				this.x = h - this.fontsize + 2;
				this.y = w;
			} else {
				this.x = x;
				this.y = y;
			}
			if (contentArr != null) {
				int arrlen = contentArr.length;
				if (xory) {
					for (int i = 0; i < arrlen; i++) {
						g.drawString(contentArr[i].toString(), this.x, this.y);
						this.x += contentArr[i].toString().length()
								* this.fontsize / 2 + 5;// 重新计算文本输出位置
					}
				} else {
					for (int i = 0; i < arrlen; i++) {
						g.drawString(contentArr[i].toString(), this.x, this.y);
						this.y += this.fontsize + 10;// 重新计算文本输出位置
					}
				}
			}
			g.dispose();
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		return img;
	}

	/**
	 * 修改图片,返回修改后的图片缓冲区（只输出一行文本）
	 * 
	 * 时间:2007-10-8
	 * 
	 * @param img
	 * @return
	 */
	public BufferedImage modifyImageYe(BufferedImage img) {

		try {
			int w = img.getWidth();
			int h = img.getHeight();
			g = img.createGraphics();
			g.setBackground(Color.WHITE);
			g.setColor(Color.blue);// 设置字体颜色
			if (this.font != null)
				g.setFont(this.font);
			g.drawString("www.hi.baidu.com?xia_mingjian", w - 85, h - 5);
			g.dispose();
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		return img;
	}

	public BufferedImage modifyImagetogeter(BufferedImage b, BufferedImage d) {

		try {
			int w = b.getWidth();
			int h = b.getHeight();

			g = d.createGraphics();
			g.drawImage(b, 20, 350, 130, 130, null);
			g.dispose();
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		return d;
	}

	public static void main(String[] args) {

		Pic tt = new Pic();

		BufferedImage d = tt.loadImageLocal("e:\\backgroud.jpg");
		//本地文件
//		BufferedImage b = tt.loadImageLocal("d:\\22.jpg");
		//网络文件 ticket = https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQGr8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyZEVzQmhXTk9jUzExMDAwMDAwN2EAAgQOPVFYAwQAAAAA
		BufferedImage b = tt.loadImageUrl("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496408215937&di=452219127161db78eb00067d1b240fe7&imgtype=0&src=http%3A%2F%2Fp1.qqyou.com%2Fpic%2Fuploadpic%2F2012-7%2F9%2F2012070908412253508.jpg");
		// 往图片上写文件
		// tt.writeImageLocal("E:\\ploanshare\\2\\22.jpg", tt.modifyImage(d,
		// "000000", 90, 90));
//		tt.writeImageLocal("d:\\cc.jpg", tt.modifyImagetogeter(b, d));
		BufferedImage newImage = tt.modifyImagetogeter(b, d);
		tt.writeImageLocal("e:\\new.jpg", tt.modifyImage(newImage,new String[]{"李春天","楼盘：保利葛洲坝海德公馆","18762738291"},165,370,false));
		// 将多张图片合在一起
		System.out.println("success");
	}
}
