package com.forum.controllers;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.forum.model.entity.Tip;
import com.forum.model.entity.Userinfo;
import com.forum.model.service.TipManagerService;

/**
 * @author ltc
 *
 */
@RestController
public class TipManagerController {
	
	public static final String CURRENT_USER = "CURRENTUSER";
	@Autowired
	public TipManagerService service;
	
//	/**
//	 * 
//	 * @param session
//	 * @return
//	 */
//	@RequestMapping("/getcuruser")
//	public Userinfo doGetCurrentUserinfo(HttpSession session) {
//		return (Userinfo)session.getAttribute(CURRENT_USER);
//	}
	
	@RequestMapping("/addtip")
	/**
	 *	我写的时候是希望前端可以不用考虑session，发帖自动只发当前用户的帖子
	 * @param session
	 * @param tip
	 * @return
	 */
	public boolean doAddTip(HttpSession session, Tip tip) {
		tip.setTipuserid(((Userinfo) session.getAttribute(CURRENT_USER)).getUserid());
		return service.addTip(tip);
	}

	@RequestMapping("/deltip")
	public boolean doDelTipById(int tipid) {
		return service.delTipById(tipid);
	}
	
	@RequestMapping("/modtip")
	public boolean doModTip(Tip tip) {
		return service.modTipById(tip);
	}
	}