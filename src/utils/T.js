import store from '../store'
import XEUtils from 'xe-utils'
// import isArray from 'core-js/library/fn/array/is-array';
const T = {
	//element ui table筛选数组过滤
	el_table_filters(array, name) {
		if (!array) return false;
		let arr = [];
		try {
			array.forEach((item, index) => {
				let obj = {}
				if (arr.findIndex((v) => {
						return v.text == item[name]
					}) < 0) {
					obj.label = item[name];
					obj.text = item[name];
					obj.value = item[name];
					arr.push(obj)
				}
			})
		} catch (err) {
			console.log(err)
		}
		return arr
	},
	arrRemove(val) {
		var index = this.findIndex((v) => {
			return v == val
		})
		if (index > -1) {
			this.splice(index, 1);
		}
	},
	// 对后端传的数值进行格式化 浮点型
	floatRow(value) {
		if (!value) return 0;
		return parseFloat(value)
	},
	// 对后端传的数值进行格式化 整数型
	intRow(value) {
		if (!value) return 0;
		return parseInt(value)
	},
	//检验表格列权限
	CheckPermissions(name) {
		if (!store.state.buttons.hasOwnProperty(store.state.tabsMenu_index)) {
			return false
		}
		return store.state.buttons[store.state.tabsMenu_index].indexOf(name) > -1 ? true : false
	},
	// 格式化性别
	formatSex({
		cellValue
	}) {
		return cellValue ? (cellValue === '1' ? '男' : '女') : ''
	},
	// 格式化下拉选项
	formatSelect({
		cellValue
	}, list) {
		const item = list.find(item => item.value === cellValue)
		return item ? item.label : ''
	},
	// 格式化日期，默认 yyyy-MM-dd HH:mm:ss
	formatDate({cellValue}, format) {
		console.log({cellValue})
		return XEUtils.toDateString(cellValue, format || 'yyyy-MM-dd')
	},
	// 四舍五入金额，每隔3位逗号分隔，默认2位数
	formatAmount({
		cellValue
	}, digits = 2) {
		return XEUtils.commafy(XEUtils.toNumber(cellValue), {
			digits
		})
	},
	// 格式化银行卡，默认每4位空格隔开
	formatBankcard({
		cellValue
	}) {
		return XEUtils.commafy(XEUtils.toValueString(cellValue), {
			spaceNumber: 4,
			separator: ' '
		})
	},
	// 四舍五入,默认两位数
	formatFixedNumber({
		cellValue
	}, digits = 2) {
		return XEUtils.toFixed(XEUtils.round(cellValue, digits), digits)
	},
	// 向下舍入,默认两位数
	formatCutNumber({
		cellValue
	}, digits = 2) {
		return XEUtils.toFixed(XEUtils.floor(cellValue, digits), digits)
	},
	formatStatisticalBar(XAxisKey,valueKey,list){
		let obj={barXAxis:[],barList:[]};
		list.forEach((item,index)=>{
			if(!item[XAxisKey]){item[XAxisKey]='未分类'};
			if(!item[valueKey]){item[valueKey]=0}
			if(obj.barXAxis.findIndex((res)=>{return res==item[XAxisKey]}) == -1){
				obj.barXAxis.push(item[XAxisKey]);
				obj.barList.push(parseFloat(item[valueKey]))
			}else{
				obj.barList[obj.barXAxis.findIndex((res)=>{return res==item[XAxisKey]})] += parseFloat(item[valueKey])
			}
		})
		return obj;
	},
	//删除除参数外的其它localStorage值 delKye['a','b']
	delLocalStorage(delKye){
		if(!Array.isArray(delKye)){return false;};
		let localStorageKey=[];
		for(var i=0;i<localStorage.length;i++){
			localStorageKey.push(localStorage.key(i))	
		}
		localStorageKey.forEach(item=>{
			if(delKye.indexOf(item) <0){
				localStorage.removeItem(item);
			}
		})
	},
	page_list(){
		console.log('触发了')
	}

}

export default T
