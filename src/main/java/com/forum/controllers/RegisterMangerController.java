package com.forum.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.forum.model.entity.Userinfo;
import com.forum.model.service.RegisterManagerService;



@RestController
public class RegisterMangerController {
	@Autowired
	private RegisterManagerService service;
	@PostMapping("/register")
	public boolean doAddUser(Userinfo user) {
		return service.addUser(user);
	}
}
