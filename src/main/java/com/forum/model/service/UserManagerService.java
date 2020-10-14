package com.forum.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.forum.model.dao.UserinfoMapper;
import com.forum.model.entity.Userinfo;
import com.forum.model.entity.UserinfoExample;
import com.forum.model.entity.UserinfoExample.Criteria;
import com.github.pagehelper.PageInfo;



@Service
public class UserManagerService {
	
	@Autowired
	//用这个可以操纵数据库
	private UserinfoMapper userMapper;

	/**
	 * 
	 * @param username
	 * @return true可用，false不可�?
	 */
	public boolean checkUsername(String username) {
		UserinfoExample example = new UserinfoExample();
		Criteria cc = example.createCriteria();
		//添加名字条件
		cc.andUsernameEqualTo(username);
		List<Userinfo> list = userMapper.selectByExample(example);
		
		return list.size()==0;
	}
	
	/**
	 * 注册新用�?
	 * @param user
	 * @return
	 */
	public boolean addNewUser(Userinfo user) {
		boolean isOK = checkUsername(user.getUsername());
		if(!isOK) {
			return false;
		}
		//进行插入操作
		userMapper.insert(user);
		return true;
	}

	/**
	 * �?查登录信�?
	 * @param user
	 * @return
	 */
	public Userinfo checkLogin(Userinfo user) {
		UserinfoExample example = new UserinfoExample();
		Criteria cc = example.createCriteria();
		cc.andUsernameEqualTo(user.getUsername());
		cc.andUserpasswordEqualTo(user.getUserpassword());
		userMapper.selectByExample(example);
		List<Userinfo> list = userMapper.selectByExample(example);
		System.out.println(list);
		if(list.size() > 0) {
			return list.get(0);
		}
		else {
			return null;
		}
	}
	
	/**
	 * 	修改用户的密�?
	 * @param userid
	 * @param userpwd
	 * @return
	 */
	public boolean modUserpwd(int userid, String userpwd) {
		Userinfo user = userMapper.selectByPrimaryKey(userid);
		user.setUserpassword(userpwd);
		int i = userMapper.updateByPrimaryKey(user);
		return i>0;
	}
	
	public int searchUseridByUsername(String username) {
		UserinfoExample example = new UserinfoExample();
		Criteria cc = example.createCriteria();
		cc.andUsernameEqualTo(username);
		Userinfo user =userMapper.selectByExample(example).get(0);
		return user.getUserid();
	}
	
	public String searchUseremailByUsername(String username) {
		UserinfoExample example = new UserinfoExample();
		Criteria cc = example.createCriteria();
		cc.andUsernameEqualTo(username);
		Userinfo user =userMapper.selectByExample(example).get(0);
		return user.getUseremail();
	}
	/**
	 * 搜索全用户
	 * @return
	 */
	public PageInfo<Userinfo> searchAllUsers(int pageNum, int pageSize){
		UserinfoExample example = new UserinfoExample();
		Criteria cc = example.createCriteria();
		List<Userinfo> list = userMapper.selectByExample(example);
		return new PageInfo<Userinfo>(list);
	}
}
