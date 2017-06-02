package xialinHub.com.module.test.img;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;

import javax.imageio.ImageIO;

/*
 *作者:xialin
 *日期:2017年6月2日
 *时间:上午9:39:44
 **/
public class StreamImageCreator extends AbstractImageCreator {
	private OutputStream stream;  
    
    public OutputStream getStream() {  
        return stream;  
    }  
  
    public void setStream(OutputStream stream) {  
        this.stream = stream;  
    }  
  
    public StreamImageCreator(Drawer drawer){  
        super(drawer);  
    }  
      
    public StreamImageCreator(Drawer drawer, OutputStream stream){  
        super(drawer);  
        this.stream = stream;  
    }  
  
    @Override  
    protected void saveImage(BufferedImage image) throws IOException {  
        ImageIO.write(image, getFontName(), stream);  
    }
}
