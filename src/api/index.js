import axios from '@/axios.js';
//系统相关接口
var api = {
	//登陆
	login(user, pw) {
		return axios.post('api/login', {
			'username': user,
			'password': pw
		})
	},
	//注销账户
	Logout(user) {
		return axios.post('api/logout')
	},
	//获取主页菜单
	menu_list() {
		return axios.post('auth/menu/get-system-menu')
	},
	//获取页面按钮权限
	get_menu_buttons(id) {
		return axios.post('auth/menu/get-menu-buttons', {
			'id': id
		})
	}
}
//首页
var index = {
	//统计图
	//今日包装计划
	PackPlan: {
		GetList() {
			return axios.post('statistics/pack-plan/get-list', {})
		}
	},
	//今日入库计划
	ProductStorage: {
		//获取汇总数据
		GetList(search) {
			return axios.post('statistics/product-storage/get-list', { search })
		},
		//获取详细数据
		GetListItem(search) {
			return axios.post('statistics/product-storage/get-list-item', { search })
		}
	},
}
//system模块
var system = {
	//菜单列表获取数据
	get_systemMenuList() {
		return axios.post('/auth/menu/get-list')
	},
	//增加菜单
	add_systemMenuList(data) {
		data.is_show = data.is_show == true ? 1 : 0;
		return axios.post('/auth/menu/add', data)
	},
	//删除菜单
	del_systemMenuList(id) {
		return axios.post('/auth/menu/delete', {
			'id': id
		})
	},
	//编辑菜单获取数据
	edit_info_systemMenuList(id) {
		return axios.post('/auth/menu/edit-info', {
			'id': id
		})
	},
	//编辑菜单
	edit_systemMenuList(data) {
		data.is_show = data.is_show == true ? 1 : 0;
		return axios.post('/auth/menu/edit', data)
	},
	// 获取系统日志
	GetList(pagesize, page, keyword, start_time, end_time) {
		return axios.post('/auth/admin-log/get-list', {
			pagesize,
			page,
			keyword,
			start_time,
			end_time
		})
	},


	//手机端
	//获取菜单
	mobile_get_systemMenuList() {
		return axios.post('/auth/mobile-menu/get-list')
	},
	//增加菜单
	mobile_add_systemMenuList(data) {
		data.is_show = data.is_show == true ? 1 : 0;
		return axios.post('/auth/mobile-menu/add', data)
	},
	//编辑菜单
	mobile_edit_systemMenuList(data) {
		data.is_show = data.is_show == true ? 1 : 0;
		return axios.post('/auth/mobile-menu/edit', data)
	},
	//编辑菜单获取数据
	mobile_edit_info_systemMenuList(id) {
		return axios.post('/auth/mobile-menu/edit-info', {
			'id': id
		})
	},
	//删除菜单
	mobile_del_systemMenuList(id) {
		return axios.post('/auth/mobile-menu/delete', {
			'id': id
		})
	},

}
//用户列表模块
var user_list = {
	get_GetList(totalPage, page, keyword) {
		return axios.post('/auth/user/get-list', {
			'pagesize': totalPage,
			page,
			keyword
		});
	},
	EditInfo(id) {
		return axios.post('/auth/user/edit-info', {
			id
		});
	},
	delete(id) {
		return axios.post('/auth/user/delete', {
			id
		});
	},
	add(form) {
		return axios.post('/auth/user/add', {
			'username': form.username,
			'truename': form.trueName,
			'role_id': form.roles,
			'status': form.status,
			'password': form.password,
			'department': form.departments,
			'job_id': form.jobId,
			'sex': form.sex,
			'mobile': form.mobile,
			'email': form.email,
			'factorys': form.factorys
		});
	},
	edit(form) {
		let id = form.id
		return axios.post('/auth/user/edit', {
			'username': form.username,
			'truename': form.trueName,
			'role_id': form.roles,
			'status': form.status,
			'password': form.password,
			'department': form.departments,
			'job_id': form.jobId,
			'sex': form.sex,
			'mobile': form.mobile,
			'email': form.email,
			'factorys': form.factorys,
			id
		});
	},
	// 获取用户权限(pc)
	GetAuth(id) {
		return axios.post('/auth/user/get-auth', { id });
	},
	//获取用户权限(app)
	GetMobileAuth(id) {
		return axios.post('/auth/user/get-mobile-auth', { id });
	},
	//修改用户权限(PC)
	UpdateAuth(id, menus) {
		return axios.post('/auth/user/update-auth', { id, menus });
	},
	//修改用户权限(app)
	UpdateMobileAuth(id, menus) {
		return axios.post('/auth/user/update-mobile-auth', { id, menus });
	},
	//修改用户密码
	ModifyPwd(data) {
		return axios.post('/auth/user/modify-pwd', data);
	},

}

//用户角色模块
var user_role = {
	get_GetList(totalPage, page, keyword) {
		return axios.post('/auth/role/get-list', {
			'pagesize': totalPage,
			page,
			keyword
		});
	},
	add(role_name) {
		return axios.post('/auth/role/add', {
			role_name
		});
	},
	edit(id, role_name) {
		return axios.post('/auth/role/edit', {
			id,
			role_name
		});
	},
	delete(id) {
		return axios.post('/auth/role/delete', {
			id
		});
	},
	//获取角色权限(PC)
	auth(id) {
		return axios.post('/auth/role/get-auth', { id });
	},
	//获取角色权限(app)
	GetMobileAuth(id) {
		return axios.post('/auth/role/get-mobile-auth', { id });
	},
	//更改角色权限(pc)
	UpdateAuth(id, menus) {
		return axios.post('/auth/role/update-auth', { id, menus });
	},
	//更改角色权限(app)
	UpdateMobileAuth(id, menus) {
		return axios.post('/auth/role/update-mobile-auth', { id, menus });
	},

}
//外贸模块
var trade = {
	// 外贸业务部周会报表
	week: {
		// 基本情况，签单金额和数量
		Contract(start_time, end_time) {
			return axios.post('/trade/report/contract', {
				start_time,
				end_time
			})
		},
		// 出货金额和数量
		Shipment(start_time, end_time) {
			return axios.post('/trade/report/shipment', {
				start_time,
				end_time
			})
		},
		//订单评审数
		Sales(start_time, end_time) {
			return axios.post('/trade/report/sales', {
				start_time,
				end_time
			})
		},
		// 收款金额
		Receipt(start_time, end_time) {
			return axios.post('/trade/report/receipt', {
				start_time,
				end_time
			})
		},
		//成本核算
		Cost(start_time, end_time) {
			return axios.post('/trade/report/cost', {
				start_time,
				end_time
			})
		},
		// 打样个数
		ProofingCount(start_time, end_time) {
			return axios.post('/trade/report/proofing-count', {
				start_time,
				end_time
			})
		},
		// 打样+成本核算
		ProofingCost(start_time, end_time) {
			return axios.post('/trade/report/proofing-cost', {
				start_time,
				end_time
			})
		},
		// 查看逾期回款
		OverduePayment(start_time, end_time) {
			return axios.post('/trade/report/overdue-payment', {
				start_time,
				end_time
			})
		},
		//添加逾期回款
		AddOverduePayment(form) {
			return axios.post('/trade/report/add-overdue-payment', {
				'department': form.group_name,
				'customer': form.name,
				'date': form.date,
				'amount': form.je,
				'remark': form.remark
			})
		},
		//删除逾期回款
		DeleteOverduePayment(id) {
			return axios.post('/trade/report/delete-overdue-payment', {
				id
			})
		},
		// 样品成交个数
		Specimen(start_time, end_time) {
			return axios.post('/trade/report/specimen', {
				start_time,
				end_time
			})
		},
		//样品成交个数录入
		AddSpecimen(form) {
			console.log(form)
			return axios.post('/trade/report/add-specimen', {
				'department': form.group_name,
				'custom_name': form.name,
				'number': form.number,
				'date': form.date,
				'remark': form.remark
			})
		},
		// 样品成交个数删除
		DeleteSpecimen(id) {
			return axios.post('/trade/report/delete-specimen', {
				id
			})
		},
		//邮件情况
		Mail(start_time, end_time) {
			return axios.post('/trade/report/mail', {
				start_time,
				end_time
			})
		},
		//邮件录入
		AddMail(form) {
			return axios.post('/trade/report/add-mail', {
				'department': form.group_name,
				'date': form.date,
				'exploitNum': form.exploit_number,
				'customerNum': form.customer_number,
				'inquiryNum': form.inquiry,
				'newInquiryNum': form.new_inquiry
			})
		},
		//下周工作
		NextWork(start_time, end_time) {
			return axios.post('/trade/report/next-work', {
				start_time,
				end_time
			})
		},
		// 下周工作重点以及需协助事项录入
		AddNextWorkInfo(form) {
			return axios.post('/trade/report/add-next-work-info', {
				'department': form.group_name,
				'date': form.date,
				'type': form.items,
				'customer': form.client,
				'order': form.orders,
				'matter': form.helps
			})
		}
	},
	//外贸部日报表
	dailyStatement: {
		//获取数据
		GetList(search) {
			return axios.post('/trade/daily/get-list', {
				search
			})
		},
		// 获取编辑信息
		EditInfo(data) {
			return axios.post('/trade/daily/edit-info', {
				data
			})
		},
		//添加，编辑
		Edit(data) {
			return axios.post('/trade/daily/edit', data)
		}
	},
	//产品报价单
	PriceSheet: {
		GetList(search) {
			return axios.post('/trade/price-sheet/get-list', { search })
		},
	}
}

//财务模块  
var finance = {
	//半成品入库
	wip: {
		//半成品入库获取数据
		GetList(pagesize, page, date) {
			return axios.post('/finance/wip/get-list', {
				pagesize,
				page,
				date
			})
		},
		//将订单关闭状态改为审核状态
		SetAudit(id) {
			return axios.post('/finance/wip/set-audit', {
				id
			})
		},
		// 导出
		Export(startDate, endDate) {
			return axios.post('/finance/wip/export', {
				startDate,
				endDate
			})
		}
	},
	// 入库筛选未领料
	MomPick: {
		// 获取数据
		GetList(pagesize, page, date) {
			return axios.post('/finance/mom-pick/get-list', {
				date
			})
		},
		//将订单关闭状态改为审核状态
		SetAudit(id) {
			return axios.post('/finance/mom-pick/set-audit', {
				id
			})
		},
		// 导出
		Export(startDate, endDate) {
			return axios.post('/finance/mom-pick/export', {
				startDate,
				endDate
			})
		}
	},
	//付款合同效验(股份)
	ContractCheck: {
		// 获取数据
		GetList(pagesize, page, search) {
			return axios.post('/finance/contract-check/get-list', {
				pagesize,
				page,
				search
			})
		},
		// 登记
		Register(id, date) {
			return axios.post('/finance/contract-check/register', {
				id,
				date
			})
		}
	},
	//采购发票勾稽(股份)
	PurVouchTax: {
		GetList(pagesize, page, search) {
			return axios.post('/finance/pur-vouch-tax/get-list', {
				pagesize,
				page,
				search
			})
		},
		//获取税票信息
		GetRegisterList(id) {
			return axios.post('/finance/pur-vouch-tax/get-register-list', {
				id
			})
		},
		// 登记
		Register(data) {
			return axios.post('/finance/pur-vouch-tax/register', {
				'amount': data.amount,
				'ids': data.ids,
				'taxNo': data.taxNo,
				'date': data.date
			})
		},
		//删除
		DeleteRegister(taxNo) {
			return axios.post('/finance/pur-vouch-tax/delete-register', {
				taxNo
			})
		}
	},
	// 港杂拖车费核算
	LocalCharge: {
		//获取数据
		GetList(pagesize, page, search) {
			return axios.post('/finance/local-charge/get-list', {
				pagesize,
				page,
				search
			})
		},
		// 登记港杂费、拖车费  type=1 登记港杂费    type=2 登记拖车费
		Register(form) {
			return axios.post('/finance/local-charge/register', {
				'id': form.id,
				'date': form.date,
				'amount': form.amount,
				'type': form.type
			})
		}
	},
	// 工资明细
	Wages: {
		//获取月份工资明细列表
		GetStaffMonthDetailList(pagesize, page, search) {
			return axios.post('/production/wage/get-staff-month-detail-list', {
				pagesize,
				page,
				search
			})
		},
		//导出
		ExportStaffMonthDetail(search) {
			return axios.post('/production/wage/export-staff-month-detail', {
				search
			})
		},
	},
	Wage: {
		//获取列表
		GetList(pagesize, page, search) {
			return axios.post('/production/wage/get-staff-summary-list', {
				pagesize,
				page,
				search
			})
		},
		//导出
		ExportStaffSummary(search) {
			return axios.post('/production/wage/export-staff-summary', {
				search
			})
		},
	},
	PackWage: {
		//获取月份工资明细列表
		GetDetailList(pagesize, page, search) {
			return axios.post('/production/pack-wage/get-detail-list', {
				pagesize,
				page,
				search
			})
		},
		//导出
		ExportDetailList(search) {
			return axios.post('/production/pack-wage/export-detail-list', {
				search
			})
		},
		//获取列表
		GetStatList(pagesize, page, search) {
			return axios.post('/production/pack-wage/get-stat-list', {
				pagesize,
				page,
				search
			})
		},
		//导出
		ExportStatList(search) {
			return axios.post('/production/pack-wage/export-stat-list', {
				search
			})
		},
	}
}
//生产模块
var production = {
	// 工厂管理
	Factory: {
		//获取列表
		GetList(pagesize, page, search) {
			return axios.post('/production/factory/get-list', {
				pagesize,
				page,
				"search[name]": search
			})
		},
		//新增
		add(data) {
			return axios.post('/production/factory/add', {
				'name': data.name,
				'place': data.place,
				'status': data.status
			});
		},
		//获取修改数据
		EditInfo(id) {
			return axios.post('/production/factory/edit-info', {
				id
			});
		},
		// 修改
		edit(data, id) {
			return axios.post('/production/factory/edit', {
				'name': data.name,
				'place': data.place,
				'status': data.status,
				id
			});
		},
		// 删除
		del(id) {
			return axios.post('/production/factory/delete', {
				id
			});
		}
	},
	//车间管理
	Workshop: {
		GetList(pagesize, page, search) {
			return axios.post('/production/workshop/get-list', {
				pagesize,
				page,
				"search[name]": search
			})
		},
		//新增
		add(data) {
			return axios.post('/production/workshop/add', {
				'name': data.name,
				'sorts': data.sorts,
				'status': data.status
			});
		},
		//获取修改数据
		EditInfo(id) {
			return axios.post('/production/workshop/edit-info', {
				id
			});
		},
		// 修改
		edit(data, id) {
			return axios.post('/production/workshop/edit', {
				'name': data.name,
				'sorts': data.sorts,
				'status': data.status,
				id
			});
		},
		// 删除
		del(id) {
			return axios.post('/production/workshop/delete', {
				id
			});
		}
	},
	//工艺档案
	Craft: {
		//获取数据
		GetList(pagesize, page, search) {
			return axios.post('/production/craft/get-list', {
				pagesize,
				page,
				search
			})
		},
		// 增加
		add(data) {
			return axios.post('/production/craft/add', data)
		},
		//获取编辑信息
		EditInfo(id) {
			return axios.post('/production/craft/edit-info', {
				id
			})
		},
		// 编辑
		edit(data) {
			return axios.post('/production/craft/edit', data);
		},
		//删除
		del(id) {
			return axios.post('/production/craft/delete', {
				id
			});
		}
	},
	// 工序档案列表
	Process: {
		// 获取数据
		GetList(pagesize, page, search) {
			return axios.post('/production/process/get-list', {
				pagesize,
				page,
				search
			})
		},
		//获取编辑信息
		EditInfo(id) {
			return axios.post('/production/process/edit-info', {
				id
			})
		},
		//新增
		add(data) {
			return axios.post('/production/process/add', data)
		},
		// 修改
		edit(data, id) {
			data.id = id
			return axios.post('/production/process/edit', data);
		},
		//删除
		del(id) {
			return axios.post('/production/process/delete', {
				id
			});
		}

	},
	//工序路线
	ProcessRoute: {
		// 获取数据
		GetList(pagesize, page, search) {
			return axios.post('/production/process-route/get-list', {
				pagesize,
				page,
				search
			})
		},
		//添加获取物料数据
		GetMaterialList(pagesize, page, search) {
			return axios.post('/production/inventory/select', {
				pagesize,
				page,
				search
			})
		},
		//获取编辑信息
		EditInfo(id) {
			return axios.post('/production/process-route/edit-info', {
				id
			})
		},
		//新增
		add(items, materialCode) {
			var items = JSON.parse(JSON.stringify(items));
			items.forEach((i, v) => {
				if (i.processId && i.processId.length > 0) {
					i.processId = i.processId[i.processId.length - 1]
				}
			});
			return axios.post('/production/process-route/add', {
				items,
				materialCode
			})
		},
		//获取版本号
		Version(code) {
			return axios.post('/production/process-route/version', {
				code
			})
		},
		//修改
		edit(id, data, materialCode) {
			var items = JSON.parse(JSON.stringify(data));
			items.forEach((i, v) => {
				if (i.processId && i.processId.length > 1 && Array.isArray(i.processId)) {
					i.processId = i.processId[i.processId.length - 1]
				}
			});
			return axios.post('/production/process-route/edit', {
				id,
				items,
				materialCode
			})
		},
		//删除
		del(id) {
			return axios.post('/production/process-route/delete', {
				id
			});
		},
		//Copy
		Copy(materialCode, version, items) {
			return axios.post('/production/process-route/copy', {
				materialCode,
				version,
				items
			})
		},
		//审核通过
		AuditSuccess(id, materialCode, items) {
			return axios.post('/production/process-route/audit-success', {
				id,
				materialCode,
				items
			})
		},
		// 审核不通过
		AuditFail(id) {
			return axios.post('/production/process-route/audit-fail', {
				id
			})
		}
	},
	// 工序人员档案
	ProcessPerson: {
		// 获取数据
		GetList(pagesize, page, search) {
			return axios.post('/production/process-person/get-list', {
				pagesize,
				page,
				search
			})
		},
		// 获取编辑数据
		EditInfo(id) {
			return axios.post('/production/process-person/edit-info', {
				id
			})
		},
		// 获取人员数据
		GetStaffList() {
			return axios.post('/production/process-person/get-staff-list')
		},
		//删除
		del(id) {
			return axios.post('/production/process-person/delete', {
				id
			});
		},
		//增加
		add(processId, staffNo, status) {
			return axios.post('/production/process-person/add', {
				processId,
				staffNo,
				status
			});
		}
	},
	//存货档案
	Inventory: {
		GetList(pagesize, page, search) {
			return axios.post('/production/inventory/get-list', {
				pagesize,
				page,
				search
			})
		},
	},
	//销售订单
	SaleOrder: {
		GetList(pagesize, page, search) {
			return axios.post('/production/sale-order/get-list', {
				pagesize,
				page,
				search
			})
		},
		// 获取销售订单子表信息
		Detail(id) {
			return axios.post('/production/sale-order/detail', {
				id
			})
		}
	},
	//生产订单
	ProductionOrder: {
		GetList(pagesize, page, search) {
			return axios.post('/production/production-order/get-list', { pagesize, page, search })
		},
		// 获取生产订单子表信息
		Detail(id) {
			return axios.post('/production/production-order/detail', {
				id
			})
		}
	},
	//班组管理
	Team: {
		GetList(pagesize, page, search) {
			return axios.post('/production/team/get-list', {
				pagesize,
				page,
				search
			})
		},
		// 获取编辑数据
		EditInfo(id) {
			return axios.post('/production/team/edit-info', {
				id
			})
		},
		//新增
		add(data) {
			return axios.post('/production/team/add', data)
		},
		//修改
		edit(data) {
			return axios.post('/production/team/edit', data);
		},
		//删除
		del(id) {
			return axios.post('/production/team/delete', {
				id
			});
		},
	},
	// 机台档案设置
	Machine: {
		GetList(pagesize, page, search) {
			return axios.post('/production/machine/get-list', {
				pagesize,
				page,
				search
			})
		},
		// 获取编辑数据
		EditInfo(id) {
			return axios.post('/production/machine/edit-info', {
				id
			})
		},
		// 新增
		add(data) {
			return axios.post('/production/machine/add', data)
		},
		//修改
		edit(data) {
			return axios.post('/production/machine/edit', data);
		},
		//删除
		del(id) {
			return axios.post('/production/machine/delete', {
				id
			});
		},
	},
	//产能数据对照
	CapacityProcess: {
		GetList(pagesize, page, search) {
			return axios.post('/production/capacity-process/get-list', { pagesize, page, search })
		},
		// 获取编辑数据
		EditInfo(id) {
			return axios.post('/production/capacity-process/edit-info', {
				id
			})
		},
		//修改
		edit(data) {
			return axios.post('/production/capacity-process/edit', data);
		},
		// 获取物料列表
		GetInventoryList(pagesize, page, search) {
			return axios.post('/production/capacity-process/get-inventory-list', { pagesize, page, search });
		},
		//添加
		Add(data, invCode) {
			return axios.post('/production/capacity-process/add', { data, invCode });
		},
		//删除
		Delete(id) {
			return axios.post('/production/capacity-process/delete', { id });
		},
		//获取子表
		GetCapacityList(pagesize, page, search) {
			return axios.post('/production/capacity-process/get-capacity-list', { pagesize, page, search });
		},
		//设为标准产能按钮
		UpdateCapacity(data) {
			return axios.post('/production/capacity-process/update-capacity', data);
		}
	},
	//钢管规格管理
	Pipe: {
		// 获取数据
		GetList(pagesize, page, search) {
			return axios.post('/production/pipe/get-list', {
				pagesize,
				page,
				search
			})
		},
		//添加获取物料数据
		GetMaterialList(pagesize, page, search) {
			return axios.post('/production/inventory/select', {
				pagesize,
				page,
				search
			})
		},
		//获取编辑信息
		EditInfo(id) {
			return axios.post('/production/pipe/edit-info', {
				id
			})
		},
		//新增
		add(data) {
			return axios.post('/production/pipe/add', data)
		},
		//修改
		edit(data) {
			return axios.post('/production/pipe/edit', data)
		},
		//删除
		del(id) {
			return axios.post('/production/pipe/delete', {
				id
			});
		}
	},
	//包装工价管理
	PackPrice: {
		// 获取数据
		GetList(pagesize, page, search) {
			return axios.post('/production/pack-price/get-list', {
				pagesize,
				page,
				search
			})
		},
		//添加获取物料数据
		GetMaterialList(pagesize, page, search) {
			return axios.post('/production/pack-price/select-inventory', {
				pagesize,
				page,
				search
			})
		},
		//获取编辑信息
		EditInfo(id) {
			return axios.post('/production/pack-price/edit-info', {
				id
			})
		},
		//新增
		add(data) {
			return axios.post('/production/pack-price/add', data)
		},
		//修改
		edit(data) {
			return axios.post('/production/pack-price/edit', data)
		},
		//删除
		del(id) {
			return axios.post('/production/pack-price/delete', {
				id
			});
		}
	},
	//BOM
	bom: {
		GetList(search) {
			return axios.post('/production/bom/get-list', search)
		},
		//获取母件及子件信息
		GetInfo(invcode) {
			return axios.post('/production/bom/get-info', {
				invcode
			})
		}
	},
	// 生产计划锁定管理
	plan: {
		GetList(pagesize, page, search) {
			return axios.post('/production/plan/get-list', {
				pagesize,
				page,
				search
			})
		},
		//获取可添加为生产计划的销售订单
		GetSaleOrders(pagesize, page, search) {
			return axios.post('/production/plan/get-sale-orders', {
				pagesize,
				page,
				search
			})
		},
		// 添加数据
		add(data) {
			return axios.post('/production/plan/add', {
				data
			})
		},
		// 修改评审时间
		UpdateDueDate(data) {return axios.post('/production/plan/update-due-date', data)},
		// 修改包装时间
		UpdatePackDate(data) {return axios.post('/production/plan/update-pack-date', data)},
		//生成制造令
		TaskAdd(id) {return axios.post('/production/task/add', {id})},
		//导出
		Export(search) {return axios.post('/production/plan/export', search)},
		//删除制造令
		TaskDel(id) {return axios.post('/production/task/delete', {id})}
	},
	//排产计划
	Schedule: {
		//获取数据
		GetList(pagesize, page, search) {
			return axios.post('/production/schedule/get-list', {
				pagesize,
				page,
				search
			})
		},
		//获取可添加的生产计划
		GetPlanList(pagesize, page, search) {
			return axios.post('/production/schedule/get-plan-list', {
				pagesize,
				page,
				search
			})
		},
		//添加排产计划
		Add(data) {
			return axios.post('/production/schedule/add', {
				data
			})
		},
		//删除排产计划
		Delete(id) {
			return axios.post('/production/schedule/delete', {
				id
			})
		},
		//修改包装时间
		UpdatePackDate(data) {
			return axios.post('/production/schedule/update-pack-date', data)
		},
		//设置工艺路线
		SetTaskRoute(id, invcode, routeId) {
			return axios.post('/production/schedule/set-task-route', {
				id,
				invcode,
				routeId
			})
		}
	},
	//制管裁管排程
	TaskPipe: {
		//获取数据
		GetList(pagesize, page, search) {
			return axios.post('/production/task-pipe/get-list', {
				pagesize,
				page,
				search
			})
		},
		GetInfo(id) {
			return axios.post('/production/task-pipe/edit-info', {
				id: id
			});
		},
		//添加排产计划
		Add(data) {
			return axios.post('/production/task-pipe/add', data)
		},
		//修改排程时间
		Edit(data) {
			return axios.post('/production/task-pipe/edit', data)
		},
		//删除排产计划
		Delete(id) {
			return axios.post('/production/task-pipe/delete', {
				id
			})
		},
		//获取排程统计数据
		GetStatList(search) {
			return axios.post('/production/task-pipe/get-stat-list', {
				search
			})
		},
	},
	// 工作中心
	WorkCenter: {
		// 获取数据
		GetList(pagesize, page, search) {
			return axios.post('/production/work-center/get-list', {
				pagesize,
				page,
				search
			})
		},
		//获取编辑信息
		EditInfo(id) {
			return axios.post('/production/work-center/edit-info', {
				id
			})
		},
		//根据车间获取设备列表
		GetWorkshopMachine(id) {
			return axios.post('/production/machine/get-workshop-machine', {
				id
			})
		},
		// 添加数据
		add(data) {
			return axios.post('/production/work-center/add', data)
		},
		edit(data) {
			return axios.post('/production/work-center/edit', data)
		},
		//删除
		del(id) {
			return axios.post('/production/work-center/delete', {
				id
			});
		},
	},
	// 制造令列表
	Task: {
		//获取表头数据
		GetList(pagesize, page, search) {
			return axios.post('/production/task/get-list', {
				pagesize,
				page,
				search
			})
		},
		//获取表头数据
		GetListWithCraft(pagesize, page, search) {
			return axios.post('/production/task/get-list-with-process', {
				pagesize,
				page,
				search
			})
		},
		//导出
		ExportListWithCraft(search) {
			return axios.post('/production/task/export-list-with-process', {
				search
			})
		},
		//获取子表数据
		GetProcessList(id) {
			return axios.post('/production/task/get-process-list', {
				id
			})
		},
		//获取流转卡信息
		GetPrintData(id) {
			return axios.post('/production/flow-card/get-print-info', id)
		},
		//打印流转卡
		PrintInfo(data) {
			return axios.post('/production/flow-card/save-print-info', data)
		},
		GetListWithProcessChoose(pagesize, page, search) {
			return axios.post('/production/task/get-list-with-process-choose', {
				pagesize,
				page,
				search
			})
		},
		GetScheduleTaskList(scheduleId) {
			return axios.post('/production/task/get-list-by-schedule', {
				scheduleId
			})
		}
	},
	//派工管理
	Assign: {
		//获取工作中心
		getWorkshopWorkcenters(pagesize, page, search) {
			return axios.post('/production/work-center/get-workshop-workcenters', {
				pagesize,
				page,
				search
			})
		},
		//获取派工列表
		GetList(pagesize, page, search) {
			return axios.post('/production/assign/get-list', {
				pagesize,
				page,
				search
			})
		},
		//批量派工获取数据
		GetInfoBatch(ids) {
			return axios.post('/production/assign/get-info-batch', {
				ids
			})
		},
		//单个派工获取数据
		GetInfo(id) {
			return axios.post('/production/assign/get-info', {
				id
			})
		},
		//提交派工信息
		Dispatch(data) {
			return axios.post('/production/assign/dispatch', {
				data
			})
		},
		//删除派工信息
		Delete(ids) {
			return axios.post('/production/assign/delete', {
				ids
			})
		},
		//清空派工数据
		Clear(ids) {
			return axios.post('/production/assign/clear', {
				ids
			})
		}
	},
	//流转卡列表
	FlowCard: {
		//获取数据
		GetList(pagesize, page, search) {
			return axios.post('/production/flow-card/get-list', {
				pagesize,
				page,
				search
			})
		},
		//删除记录
		Delete(id) {
			return axios.post('/production/flow-card/delete', {
				id
			});
		}
	},
	//组派工
	AssignGroup: {
		//获取组待分配列表
		GetWorkcenterAssignList(search) {
			return axios.post('/production/assign/get-workcenter-assign-list', {
				search
			})
		},
		//指派工作中心
		DispatchWorkcenter(data) {
			return axios.post('/production/assign/dispatch-workcenter', data)
		},
		//删除指派工作中心
		del(ids) {
			return axios.post('/production/assign/undispatch-workcenter', {
				ids
			});
		},
	},
	//组派工记录
	AssignRecord: {
		GetRecordList(pagesize, page, search) { return axios.post('/production/assign/get-record-list', { pagesize, page, search }) },
		//获取委托派工信息
		GetDetailEntrustInfo(id) {
			return axios.post('/production/assign/get-detail-entrust-info', { id })
		},
		//提交委托信息
		DetailEntrust(data) {
			return axios.post('/production/assign/detail-entrust', data)
		},
		GetPrintRecord(data) { return axios.post('/production/assign/get-print-record', data) },
		GetPrintRecordByInvcode(data) { return axios.post('/production/assign/get-print-record-by-invcode', data) },

	},
	//人员派工记录
	AssignDetailRecord: {
		GetDetailRecordList(pagesize, page, search) { return axios.post('/production/assign/get-detail-record-list', { pagesize, page, search }) },
		getDetailPrintRecord(data) { return axios.post('/production/assign/get-detail-print-record', data) }
	},
	//报工管理
	Report: {
		//获取数据
		GetList(pagesize, page, search) {
			return axios.post('/production/report/get-list', {
				pagesize,
				page,
				search
			})
		},
		//获取报工信息
		GetInfo(id) {
			return axios.post('/production/report/get-info', { id })
		},
		//获取发单工序信息
		GetSendList(data) {
			return axios.post('/production/report/get-send-list', data)
		},
		//收单
		Receive(data) {
			return axios.post('/production/report/receive', data)
		},
		//发单报工
		SaveCompleteQty(data) {
			return axios.post('/production/report/save-complete-qty', data)
		}
	},
	//报工记录
	ReportingRecord: {
		//获取数据
		GetList(pagesize, page, search) {
			return axios.post('/production/report/get-record-list', {
				pagesize,
				page,
				search
			})
		},
		//删除报工记录
		Delete(ids) {
			return axios.post('/production/report/delete', {
				ids
			})
		},

	},
	//包装计划
	PackPlan: {
		//获取数据
		GetList(pagesize, page, search) {
			return axios.post('/production/pack-plan/get-list', {
				pagesize,
				page,
				search
			})
		},
		//修改包装时间
		UpdatePackDate(data) {
			return axios.post('/production/pack-plan/update-pack-date', data)
		},
		//获取包装计划的生产任务列表，生成包装任务时获取
		GetAddInfo(id) {
			return axios.post('/production/pack-task/get-add-info', {
				id
			})
		},
		//生成包装任务
		Add(data) {
			return axios.post('/production/pack-task/add', data)
		},
	},
	//包装任务
	PackTask: {
		//获取数据
		GetList(pagesize, page, search) {
			return axios.post('/production/pack-task/get-list', {
				pagesize,
				page,
				search
			})
		},
		//备料单
		Export(id) {
			return axios.post('/production/pack-task/export', {
				id
			})
		},
		//获取打印的备料单
		GetPrintInfo(taskId) {
			return axios.post('/production/pack-card/get-print-info', {
				taskId
			})
		},
		//指派/变更工作中心
		DispatchWorkcenter(data) {
			return axios.post('/production/pack-task/dispatch-workcenter', data)
		},
		//删除
		Delete(ids) {
			return axios.post('/production/pack-task/delete', {
				ids
			})
		},
		//拆分
		Split(data) {
			return axios.post('/production/pack-task/split', data)
		},
		//获取打印信息
		GetIdcardInfo(id) {
			return axios.post('/production/pack-task/get-idcard-info', {
				id: id
			})
		},
		//获取打印视图
		GetIdcardPrint(data) {
			return axios.post('/production/pack-task/get-idcard-print', data)
		},
	},
	//包装人员派工
	PackAssign: {
		//获取派工信息
		GetInfo(id) {
			return axios.post('/production/pack-assign/get-info', {
				id
			})
		},
		//提交批量派工信息
		Dispatch(data) {
			return axios.post('/production/pack-assign/dispatch', data)
		},
		//清空派工信息
		Clear(ids) {
			return axios.post('/production/pack-assign/clear', {
				ids
			})
		}
	}


}
//采购
var purchase = {
	//请购单执行统计表
	Requisition: {
		//获取数据
		GetList(pagesize, page, search) {
			return axios.post('/purchase/requisition/get-list', { pagesize, page, search })
		},
		//导出
		Export(search) {
			return axios.post('/purchase/requisition/export', { search })
		}
	},
	//委外请购执行统计表
	purchaseOutsource: {
		//获取数据
		GetList(pagesize, page, search) {
			return axios.post('/purchase/purchase-outsource/get-list', { pagesize, page, search })
		},
		//导出
		Export(search) {
			return axios.post('/purchase/purchase-outsource/export', { search })
		}
	}
}

//仓储
var warehouse = {
	//包材标识卡打印
	PackMaterialCard: {
		//获取数据
		GetList(pagesize, page, search) {
			return axios.post('/warehouse/pack-material-card/get-list', { pagesize, page, search })
		},
		//弹窗获取数据
		ViewInfo(id) {
			return axios.post('/warehouse/pack-material-card/view-info', { id })
		},
		//上传数据
		View(data) {
			return axios.post('/warehouse/pack-material-card/view', data)
		}
	}
}
//HR
var hr = {
	RecruitmentReport: {
		//获取数据
		GetList(pagesize, page, search) {
			return axios.post('/hr/recruitment-report/get-list', {
				pagesize,
				page,
				search
			})
		},
		//获取编辑信息
		EditInfo(id) {
			return axios.post('/hr/recruitment-report/edit-info', {
				id
			})
		},
		// 增加
		Add(data) {
			return axios.post('/hr/recruitment-report/add', data)
		},
		// 编辑
		Edit(data) {
			return axios.post('/hr/recruitment-report/edit', data);
		},
		//删除
		Del(id) {
			return axios.post('/hr/recruitment-report/delete', {
				id
			});
		}
	},
	Candidate: {
		//获取数据
		GetList(pagesize, page, search) {
			return axios.post('/hr/candidate/get-list', {
				pagesize,
				page,
				search
			})
		},
		//获取编辑信息
		EditInfo(id) {
			return axios.post('/hr/candidate/edit-info', {
				id
			})
		},
		//获取查看信息
		ViewInfo(id) {
			return axios.post('/hr/candidate/view-info', {
				id
			})
		},
		// 增加
		Add(data) {
			return axios.post('/hr/candidate/add', data)
		},
		// 编辑
		Edit(data) {
			return axios.post('/hr/candidate/edit', data);
		},
		//删除
		Del(id) {
			return axios.post('/hr/candidate/delete', {
				id
			});
		},
		//移入黑名单
		MoveToBlacklist(id) {
			return axios.post('/hr/candidate/move-to-blacklist', {
				id
			});
		},
		//移出黑名单
		MoveFromBlacklist(id) {
			return axios.post('/hr/candidate/move-from-blacklist', {
				id
			});
		},
		//沟通记录-列表
		GetContactList(candidateId, search) {
			return axios.post('/hr/candidate-contact/get-list', {
				candidateId,
				search
			})
		},
		//沟通记录-获取编辑信息
		EditContactInfo(candidateId, id) {
			return axios.post('/hr/candidate-contact/edit-info', {
				candidateId,
				id
			})
		},
		//沟通记录-增加
		AddContact(data) {
			return axios.post('/hr/candidate-contact/add', data)
		},
		//沟通记录-编辑
		EditContact(data) {
			return axios.post('/hr/candidate-contact/edit', data);
		},
		//沟通记录-删除
		DelContact(candidateId, id) {
			return axios.post('/hr/candidate-contact/delete', {
				candidateId,
				id
			});
		},
		//沟通记录明细-列表
		GetContactDetailList(pagesize, page, search) {
			return axios.post('/hr/candidate-contact/get-detail-list', {
				pagesize,
				page,
				search
			})
		},
	},
	//招聘部门
	Department: {
		//获取数据
		GetList(pagesize, page, search) {
			return axios.post('/hr/department/get-list', {
				pagesize,
				page,
				search
			})
		},
		// 增加
		add(data) {
			return axios.post('/hr/department/add', data)
		},
		//获取编辑信息
		EditInfo(id) {
			return axios.post('/hr/department/edit-info', {
				id
			})
		},
		// 编辑
		edit(data) {
			return axios.post('/hr/department/edit', data);
		},
		//删除
		del(id) {
			return axios.post('/hr/department/delete', {
				id
			});
		}
	},
	// 职位
	Post: {
		GetList(pagesize, page, search) {
			return axios.post('/hr/post/get-list', {
				pagesize,
				page,
				search
			})
		},
		// 获取编辑数据
		EditInfo(id) {
			return axios.post('/hr/post/edit-info', {
				id
			})
		},
		// 新增
		add(data) {
			return axios.post('/hr/post/add', data)
		},
		//修改
		edit(data) {
			return axios.post('/hr/post/edit', data);
		},
		//删除
		del(id) {
			return axios.post('/hr/post/delete', {
				id
			});
		},
	},
	// 招聘人员
	Recruiter: {
		GetList(pagesize, page, search) {
			return axios.post('/hr/recruiter/get-list', {
				pagesize,
				page,
				search
			})
		},
		// 获取编辑数据
		EditInfo(id) {
			return axios.post('/hr/recruiter/edit-info', {
				id
			})
		},
		// 新增
		add(data) {
			return axios.post('/hr/recruiter/add', data)
		},
		//删除
		del(id) {
			return axios.post('/hr/recruiter/delete', {
				id
			});
		},
	},
	// 招聘计划
	RecruitmentPlan: {
		GetList(pagesize, page, search) {
			return axios.post('/hr/recruitment-plan/get-list', {
				pagesize,
				page,
				search
			})
		},
		// 获取编辑数据
		EditInfo(id) {
			return axios.post('/hr/recruitment-plan/edit-info', {
				id
			})
		},
		// 新增
		add(data) {
			return axios.post('/hr/recruitment-plan/add', data)
		},
		// 编辑
		edit(data) {
			return axios.post('/hr/recruitment-plan/edit', data);
		},
		//删除
		del(id) {
			return axios.post('/hr/recruitment-plan/delete', {
				id
			});
		},
	},
	// 招聘计划统计
	RecruitmentPlanStat: {
		getInfo() {
			return axios.post('/hr/recruitment-plan-stat/get-info', {});
		},
		GetList(search) {
			return axios.post('/hr/recruitment-plan-stat/get-list', {
				search
			})
		},
		export(search) {
			return axios.post('/hr/recruitment-plan-stat/export', {
				search
			})
		}
	},
}
//报表
var report = {
	//生产日报表
	ReportDaily: {
		//时报
		Detailed: {GetList(reportDate) { return axios.post('/production/report-daily/get-list', { reportDate }) },},
		//日报
		Summary: {GetList(reportDate) { return axios.post('/production/report-daily/get-daily-list', { reportDate }) },}
	},
	//生产日报表(时间段)
	ReportDailyTime: {
		//获取数据
		GetTimePeriodReportList(reportDate, workshopId) {
			return axios.post('/production/report-daily/get-time-period-report-list', { reportDate, workshopId })
		}
	},
	//订单生产进度
	ReportOrderPlan:{
		//获取数据
		GetList(search) { return axios.post('/production/report-order-plan/get-list', { search })},
		//获取自制件
		GetPart(search){return axios.post('/production/report-order-plan/get-part', { search })},
		//获取工序及报工情况
		GetProduction(search){return axios.post('/production/report-order-plan/get-production', { search })}
	}

}

var notLoginViews={
	//计件工资
	salary:{
		GetList(schedule_id) { return axios.post('/production/salary/get-list', { schedule_id })},
	}
	
}
export default {
	api,
	index,
	system,
	user_list,
	user_role,
	finance,
	trade,
	production,
	hr,
	report,
	warehouse,
	purchase,
	notLoginViews,
}
