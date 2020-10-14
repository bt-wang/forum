package com.forum.model.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.forum.model.dao.AdminMapper;
import com.forum.model.dao.UserinfoMapper;
import com.forum.model.entity.Admin;
import com.forum.model.entity.AdminExample;
import com.forum.model.entity.Userinfo;
import com.forum.model.entity.UserinfoExample;
import com.forum.model.entity.UserinfoExample.Criteria;



@Service
public class LoginManagerService {
	@Autowired
	private UserinfoMapper usermapper;
	@Autowired
	private AdminMapper adminmapper;
	 public Userinfo checkLogin(Userinfo user) {
		UserinfoExample example=new UserinfoExample();
		 Criteria cc=example.createCriteria();
		 cc.andUsernameEqualTo(user.getUsername());
		 cc.andUserpasswordEqualTo(user.getUserpassword());
		List<Userinfo> list= usermapper.selectByExample(example);
		if(list.size()>0) {
			return list.get(0);
		}
		else {
			return null;
		}
	 }
	 
	 public Admin checkAdminLogin(Admin admin) {
		 AdminExample example=new AdminExample();
		 com.forum.model.entity.AdminExample.Criteria cc=example.createCriteria();
		 cc.andAdminnameEqualTo(admin.getAdminname());
		 cc.andAdminpasswordEqualTo(admin.getAdminpassword());
		 List<Admin> list=adminmapper.selectByExample(example);
		 if(list.size()>0) {
				return list.get(0);
			}
			else {
				return null;
			}
		 
		 }
	 
	 public boolean modUserTime(int userid, Date date) {
			Userinfo user = usermapper.selectByPrimaryKey(userid);
			user.setUserregdate(date);
			int i = usermapper.updateByPrimaryKey(user);
			return i>0;
	 }
}
