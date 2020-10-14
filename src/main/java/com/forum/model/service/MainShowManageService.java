package com.forum.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.forum.model.dao.ReplyMapper;
import com.forum.model.dao.TipMapper;
import com.forum.model.dao.UserinfoMapper;
@Service
public class MainShowManageService {
	@Autowired
	private UserinfoMapper userinfomapper;
	@Autowired
	private TipMapper tipmapper;
	@Autowired
	private ReplyMapper replymapper;
	
	
}
