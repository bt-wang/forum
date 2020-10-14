package com.forum.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.forum.model.dao.UserinfoMapper;
import com.forum.model.entity.Userinfo;
import com.forum.model.entity.UserinfoExample;
import com.forum.model.entity.UserinfoExample.Criteria;



@Service
public class RegisterManagerService {
	@Autowired
	private UserinfoMapper usermapper;
	public boolean addUser(Userinfo user) {
	UserinfoExample example=new UserinfoExample();
	Criteria cc=example.createCriteria();
	cc.andUsernameEqualTo(user.getUsername());	
	List<Userinfo> list = usermapper.selectByExample(example);	
	if(list.size()==0) {
		int i=usermapper.insert(user);
		if(i>0) {
			return true;
		}
		else {
			return false;
		}
	}
	else {
		return false;
	}
	/*	int i=usermapper.insert(user);
		if(i>0) {
			return true;
		}
		else {
			return false;
		}*/
	}
}
