package com.forum.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.forum.model.dao.TipMapper;
import com.forum.model.entity.Tip;
import com.forum.model.entity.TipExample;
import com.forum.model.entity.TipExample.Criteria;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
/**
 * @author ltc
 * 
 */
@Service
public class TipManagerService {
	@Autowired
	private TipMapper tm;

	//查询,用于显示
	public PageInfo<Tip> searchTips(Tip cond, int pageNum, int pageSize){
		TipExample example = new TipExample();
		Criteria tc = example.createCriteria();
		if(null != cond.getTipuserid()) {
			tc.andTipidEqualTo(cond.getTipuserid());
		}
		if(null != cond.getTipid()) {
			tc.andTipidEqualTo(cond.getTipid());
		}
		if(null != cond.getTiptime()) {
			tc.andTiptimeEqualTo(cond.getTiptime());
		}
		PageHelper.startPage(pageNum, pageSize);
		List<Tip> list = tm.selectByExample(example);
		return new PageInfo<Tip>(list);
	}
	
	public boolean addTip(Tip tip) {
		int n = tm.insert(tip);
		return n>0;
	}
	
	public boolean delTipById(int tipid) {
		int n = tm.deleteByPrimaryKey(tipid);
		return n>0;
	}
	
	public boolean modTipById(Tip tip) {
		int n = tm.updateByPrimaryKeySelective(tip);
		return n>0;
	}
}
