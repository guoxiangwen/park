// import crypto from 'crypto';

// 使用随机值加盐，MD5加密
export function cryptPwd(password) {
//   const salt = Math.random().toString().slice(2, 5);
  // 密码“加盐”
//   const saltPassword = password + ':' + salt;
  const saltPassword = password;
  return saltPassword;
  // 加盐密码的md5值
  // const md5 = crypto.createHash('md5');
  // const result = md5.update(saltPassword).digest('hex');
  // return result;
}
// 获取url参数
export function getUrlPara(key) {
  const queryStr = window.location.search.slice(1);
  const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`, 'i');
  const matchRes = queryStr.match(reg);
  if (matchRes && matchRes[2]) {
    return decodeURIComponent(matchRes[2]);
  } else {
    return '';
  }
}

//判断是否微信登陆
export function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	//console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
	if (ua.match(/MicroMessenger/i)) {
		return true;
	} else {
		return false;
	}
}
