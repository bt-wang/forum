package com.forum.controllers;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.forum.model.entity.Userinfo;
import com.forum.model.service.MainShowManageService;
@RestController
public class MainShowManageController {
	public static final String M_USER="CURRENTUSER";
	@Autowired
	private MainShowManageService service;
	@PostMapping("/getnowuser")
	public Userinfo doGetCurrentUserinfo(HttpSession session) {
		return (Userinfo)session.getAttribute(M_USER);
	}
}