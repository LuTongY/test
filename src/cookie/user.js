import Cookies  from 'js-cookie'

import store from '@/store';
import { arrayEach } from 'xe-utils';

export function setCookie(info) {
	if(info){
		Cookies.set('user_name', escape(info.truename));
		Cookies.set('user_work', info.username?info.username:'');
	}
     return true;
}
/**
 * 获取用户的cookie信息
 */
export function getUserCookie() {
  return {
    'user_name': Cookies.get('user_name'),
	'user_work': Cookies.get('user_work')?unescape(Cookies.get('user_work')):'',
  };
}
/**
 * 移除cookie
 */
export function removeUserCookie() {
	Cookies.remove('user_name');
	Cookies.remove('user_work');
	return true;
  }

export function updateTabIndex(Arr,searchIndex){
	arrPath=[];
	count=0
	let number
	for(let i=0;i<Arr.length;i++){	
		deepFinds(Arr[i], searchIndex)
		if(count>0){ number=i;break}
	}
	return number
}


var arrPath=[]//保存路径
var count=0
function deepFinds(node,target) {
  arrPath.push(node.id)
  if(node.id == target)
  {
    count++
  }
  if(node.children)
  {
    for (let i=0;i<node.children.length;i++)
    {
      let flag=deepFinds(node.children[i],target)
      if(!flag)
        arrPath.pop()
      else
        break
    }

  }
  return count > 0
}

// 全局参数初始化
export function Configured(name){
	var data={}
	try{
		 data=JSON.parse(localStorage.getItem("Configured"))?JSON.parse(localStorage.getItem("Configured")):{} 
	}catch(err){
		localStorage.setItem("Configured", JSON.stringify(data))
	}
	if(!data['tableSize']){data['tableSize']="medium"}
	
	return data[name]
}






