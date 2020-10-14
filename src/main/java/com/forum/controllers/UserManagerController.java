package com.forum.controllers;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.forum.model.entity.Userinfo;
import com.forum.model.service.UserManagerService;
import com.github.pagehelper.PageInfo;

/**
 * 用户管理模块的控制类
 * @author 刘天�?
 *
 */
@RestController//告诉Spring，该类下�?有方法都相当于添加了@Responsebody注解、结果转为json形式
public class UserManagerController {
	
	public static final String CURRENT_USER = "CURRENTUSER";
	@Autowired
	private UserManagerService service;

	/**
	 * 	获取当前用户的登录信�?  
	 * @param ssession
	 * @return
	 */
	@RequestMapping("/getcuruser")
	public Userinfo doGetCurrentUserinfo(HttpSession session) {
		return (Userinfo)session.getAttribute(CURRENT_USER);
	}
	
	/**
	 * �?查用户名时�?�可�?
	 * @param user
	 * @return
	 */
	@RequestMapping("/checkname")
	public boolean doCheckName(Userinfo user) {
		//return service.checkUsername(user.getUsername());
		return service.checkUsername(user.getUsername());
	}
	
	@RequestMapping("/getallusers")
	public  PageInfo<Userinfo> doSearchAll(int pageNum, int pageSize){
		return service.searchAllUsers(pageNum,pageSize);
	}
	
//	/**
//	 * 用来处理用户登录请求的方�?
//	 * 
//	 * @param user
//	 * @param session
//	 * @return
//	 */
//	@PostMapping("/login")
//	public Userinfo doLogin(Userinfo user, HttpSession session) {
//		
//		Userinfo result = service.checkLogin(user);
//		if(null != result) {
//			session.setAttribute("CURRENTUSER", result);
//			return result;
//		}
//		else {
//			return new Userinfo();
//		}
//	}
///**
// * liutianci
// * @param session
// * @return
// */
//	@PostMapping("/logout")
//	public boolean doLogout(HttpSession session) {  
//		if (session != null) {
//			session.invalidate();//调用session的invalidate()方法，将保存的session删除  
//		}
//		boolean b = (null == doGetCurrentUserinfo(session));
//		return b;
//	}
	
	/**
	 * 处理注册请求的方�?
	 */
	@RequestMapping("/reg")
	public boolean doReg(Userinfo user) {
		return service.addNewUser(user);
	}
	
	@RequestMapping("/modpwd")
	public boolean doModUserpwd(int userid, String userpwd) {
		return service.modUserpwd(userid, userpwd);
	}
	@RequestMapping("/modpwdbyusername")
	public boolean doModUserpwdByUsername(String username, String userpwd) {
		return service.modUserpwd(service.searchUseridByUsername(username), userpwd);
	}
	@RequestMapping("/checkemail")
	public boolean doCheckEmail(String username, String email) {
		if(email.equals(service.searchUseremailByUsername(username))) {
			return true;
		}
		else
		{
			return false;
		}
	}
	@RequestMapping("/checklogin")
	public boolean doCheckLogin(Userinfo user) {
		return (null != service.checkLogin(user));
	}
}
