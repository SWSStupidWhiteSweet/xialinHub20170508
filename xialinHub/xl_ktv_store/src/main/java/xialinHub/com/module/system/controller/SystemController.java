package xialinHub.com.module.system.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import xialinHub.com.platform.controller.BaseController;


/*
 *作者:xialin
 *日期:2017年5月8日
 *时间:下午4:23:31
 **/
@Controller
@RequestMapping("system")
public class SystemController extends BaseController {

	@RequestMapping("index")
	public ModelAndView index(){
		ModelAndView mv = this.getModelAndView();
		mv.setViewName("/module/system/role/roleindex");
		return mv;
	}
}
