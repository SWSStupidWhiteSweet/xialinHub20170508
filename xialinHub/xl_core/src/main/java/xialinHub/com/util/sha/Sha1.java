/*
 * Copyright (C) 2006 Softabar
 * 
 * This program is free software; you can redistribute it and/or modify it 
 * under the terms of the GNU General Public License as published by the 
 * Free Software Foundation; either version 2 of the License, or 
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the 
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License 
 * along with this program; if not, write to the 
 * Free Software Foundation, * Inc., * 59 Temple Place, * Suite 330, 
 * Boston, MA 02111-1307 USA
*/
package xialinHub.com.util.sha;

import java.io.File;

/**
 * Usage: java com.softabar.sha4j.Sha1 <text> or Sha1 -f<filename>.<br/>
 * Calculates SHA-1 from text or file.
 * 
 * <pre>
 * Copyright (C) 2006 Softabar
 * 
 * This program is free software; you can redistribute it and/or modify it 
 * under the terms of the GNU General Public License as published by the 
 * Free Software Foundation; either version 2 of the License, or 
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the 
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License 
 * along with this program; if not, write to the 
 * Free Software Foundation, * Inc., * 59 Temple Place, * Suite 330, 
 * Boston, MA 02111-1307 USA
 * </pre>
 * 
 * @version 1.0
 */
public class Sha1
{

  public static void main(String[] args)
  {
    try
    {
      String text=args[0];
      if(text==null)
      {
        System.out.println("Usage: Sha1 <text> or Sha1 -f<filename>");
        return;
      }
      if(text.startsWith("-f"))
      {
        System.out.println(ShaUtil.toSha1String(new File(text.substring(2))));
        
      }
      else
      {
        System.out.println(ShaUtil.toSha1String(text));
      }
    }
    catch(Exception e)
    {
      System.out.println(e.toString());
      System.out.println("Usage: Sha1 <text> or Sha1 -f<filename>");
    }

  }

}
