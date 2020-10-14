//package com.forum.controllers;
//
//import javax.servlet.http.HttpServletRequest;
//
//import org.springframework.mail.MailSender;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.forum.model.dao.UserinfoMapper;
//import com.forum.model.entity.Userinfo;
//import com.forum.model.service.LoginManagerService;
//import com.forum.model.service.RegisterManagerService;
//import com.forum.model.service.UserManagerService;
//
//@RestController
//public class SendEmailController {
//	/**
//	 * 发送邮件
//	 * 
//	 * @param request
//	 * @return
//	 */
//	@RequestMapping(value = "/sendEmail.jhtml")
//	@ResponseBody
//	public String sendEmail(HttpServletRequest request) {
//		DynamicParams params = new DynamicParams(request);
//		StringBuilder builder = new StringBuilder();
//		StringBuffer url = new StringBuffer();
//		String type = params.getString("type");
//		Long uid = params.getLong("id");
//		Userinfo Userinfo = UserinfoMapper
//		String subject = "";
//		
//			// type = forget 密码重置
//			String verifyCode = VerifyCodeUtils.generateVerifyCode(4);
//			request.getSession().setAttribute("resetCertCode", verifyCode);
//			url.append("<font color='red'>" + verifyCode + "</font>");
//			// 正文
//			builder.append("<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" /></head><body>");
//			builder.append("要使用新的密码, 请将已下字符输入验证框中，完成重置密码的操作!");
//			builder.append("<br/><br/>");
//			builder.append("<div>" + url + "</div>");
//			builder.append("</body></html>");
//			subject = "密码重置 - xxxx";
//		
//		MailSender.mailSimple(Userinfo.getEmail(), subject, builder.toString(),
//				false, null);
//		return successMsg();
//	}
//}
