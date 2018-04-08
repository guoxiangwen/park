import React from 'react';
import moment from 'moment';
import { List, Stepper, Toast, Radio, WingBlank, Button, Icon ,Modal} from 'antd-mobile';
import { connect } from 'react-redux';
import API from '../api/';
import { addPay } from '../redux/actions/pay';
import {getUrlPara} from '../utils/';
import '../assets/less/pay.less';
declare function require(string): string;
declare var WeixinJSBridge: any;
const alert = Modal.alert;
const recommendImg = require('../assets/imgs/recommend.png');

const Item: any = List.Item;
const Brief = Item.Brief;
const RadioItem = Radio.RadioItem;
export interface PayProps {
  plateNum: Array<string>;
  phone:string;
  plateRegion: string;
  discount: string;
  history:any;
  addPay: (totalAmount: any) => void;
}
export interface PayState {
  addHours: number;
  fee: number,
  enterTime: string;
  durTime: string;
  plateNum: string;
  phone:string;
  orderTime: string;
  aliPay: boolean;
  wePay: boolean;
  couponCash: number;
  leaveTime: number;
  disabled: boolean;
  under:number;
}

let aliShow = false;
let weShow = false;
if (window.navigator.userAgent.indexOf('Alipay') !== -1) {
  aliShow = true;
}
if (window.navigator.userAgent.indexOf('MicroMessenger') !== -1) {
  weShow = true;
}
class Pay extends React.Component<PayProps, PayState> {
  constructor() {
    super();
    this.state = {
      addHours: 0,
      fee: 0,
      enterTime: '',
      durTime: '',
      plateNum: '',
      phone: '',
      orderTime: '',
      aliPay: true,
      wePay: false,
      couponCash: 0,
      leaveTime: 0,
      disabled: true,
      under:0
    };
  }
  componentDidMount() {
    document.title = '停车付费';
    const newNum = this.props.plateNum.slice(1);
    const couponCash: any = Math.round(parseInt(getUrlPara('couponCash'))).toFixed(2)
    if (this.props.plateNum[0] && newNum) {
      this.setState({
        ...this.state,
        plateNum: this.props.plateRegion + this.props.plateNum[0] + newNum.join(''),
        couponCash
      },()=>{  
          const plateNumber = this.props.plateRegion + this.props.plateNum[0] + newNum.join('');
          this.getFee({plateNumber});
      });
    }
    if(weShow){
        this.setState((prevState)=>{
            return {
              ...prevState,
              aliPay:false,
              wePay:true
            };
        });
    }

  }
  form:any;
  onChange(val) {
    let leaveTime = moment().toDate().getTime();
    if (this.state.addHours < val ) {
      leaveTime = moment(this.state.leaveTime ? this.state.leaveTime : undefined).add(1, 'h').toDate().getTime();
    } else if (this.state.addHours > val) {
      leaveTime = moment(this.state.leaveTime ? this.state.leaveTime : undefined).subtract(1, 'h').toDate().getTime();
    }

    this.setState({
      ...this.state,
      addHours: val,
      leaveTime
    });
    const plateNumber = this.props.plateRegion + this.props.plateNum.join('');
    API.getFeeCalcResource({
      plateNumber,
      leaveTime
    }).then((res:any) => {
      if (res.data.code === 200) {
        this.setState({
          ...this.state,
          fee: res.data.payload.fee,
        });
      } else {
        Toast.info('获取费用时出错,请重试！', 3, ()=>{}, true);
      }
    });
  }
  getFee(payload) {
    API.getParkInfoResource(payload).then((res: any) => {
      if (res.data.code === 200) {
        if(res.data.payload.under!=0){
            alert(`优惠券提示`, `地下停车场无法使用优惠券,是否继续？`, [
              { text: '取消', onPress: () => {this.props.history.push(`/`); } },
              { text: '继续', onPress: () => {this.setState({couponCash:0})}, style: { fontWeight: 'bold' } },
            ]);
        }
        // var couponCashValue = undered==1?0:this.state.couponCash;
        this.setState((prevState)=>{
          return {
            ...prevState,
            fee: res.data.payload.fee,
            enterTime: res.data.payload.enterTime,
            durTime: res.data.payload.durTime,
            leaveTime: res.data.payload.validTime,
            disabled: false,
            under:res.data.payload.under,
            couponCash:res.data.payload.under==0?this.state.couponCash:0
          };
        });
      } else {
        Toast.info('获取费用时出错,请重试！', 3, ()=>{}, true);
      }
    });
  }
  pay(e) {
    e.preventDefault();
    if (this.state.aliPay) {
      this.form.action="/parking/api/v1/pay/wapPay?leaveTime="+this.state.leaveTime;
      this.form.submit();
    } else {
      const plateNumber = this.state.plateNum;
      const couponCode = this.state.couponCash<=0?"":this.props.discount;
      const phone = this.props.phone;
      const total = this.state.fee;
      const subject = '海峡茶城停车缴费';
      const from = '2';
	    API.wxWapPay({
	      plateNumber,
	      phone,
	      couponCode,
	      total,
	      subject,
	      from,
	      openid: localStorage.getItem("wxopenid"),
	      leaveTime: this.state.leaveTime
	    }).then((res:any) => {
	      if (res.data.code === 200) {
        //TODO 根据返回的数据起调微信支付,wxWapPay里把参数组合好直接返回
        
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest',
          {
            "appId":res.data.data.appId,
            "timeStamp": res.data.data.timeStamp, //时间戳
            "nonceStr": res.data.data.nonceStr, //随机串
            "package": res.data.data.package,//扩展包
            "signType": "MD5", //微信签名方式:1.sha1
            "paySign":res.data.data.paySign //微信签名
          },
          bkresult => {
            WeixinJSBridge.log(bkresult.err_msg);
            // alert(bkresult.err_code+res.err_desc+bkresult.err_msg);
            if(bkresult.err_msg == "get_brand_wcpay_request:ok"){
                  this.props.history.push(`/result`); 
            }else{
                  //返回跳转到订单详情页面
                  this.props.history.push(`/result?status=failed`); 
            } 
          }
         );
	      } else {
		      Toast.info(`微信支付出错,请重试！`, 3, ()=>{}, true);
	      }
	    });
	  }    
  }
  onPayChange(type){
    if(type == 1) {
      this.setState({
        wePay: true,
        aliPay: false
      });
    }
    if(type == 0) {
      this.setState({
        wePay: false,
        aliPay: true
      });
    }
  }
  render() {
    const discountable : any = (this.state.fee - this.state.couponCash).toFixed(2)
    return (<div>
      <div className="info">
        <div className="title">
          <span className="logo"><Icon size="xs" type={require('../assets/svg/car.svg')} /></span>
          <span>海峡茶城停车场</span>
        </div>
        <div className="cash">
          {discountable< 0 ? 0 : discountable}
        </div>
      </div>
      <List renderHeader={() => '停车信息'}>
        <Item extra={this.state.plateNum} wrap>车牌号</Item>
        <Item extra={this.state.enterTime} wrap>入场时间</Item>
        <Item extra={this.state.durTime} wrap>停车时长</Item>
        <Item extra={this.state.leaveTime && moment(this.state.leaveTime).format('YYYY-MM-DD HH:mm:ss')} wrap>最晚离场时间</Item>
	      <Item wrap
          extra={<Stepper
            style={{ width: '100%', minWidth: '2rem' }}
            showNumber
            max={24}
            min={0}
            disabled={this.state.disabled}
            value={this.state.addHours}
            onChange={this.onChange.bind(this)}
          />}
        >增加停车时间(小时)</Item> 
	
      </List>
      <List renderHeader={() => '计费信息'}>
        <Item extra={this.state.fee}>总金额</Item>
        <Item extra={this.state.couponCash}>优惠金额</Item>
      </List>
      <List renderHeader={() => '请选择支付方式'}>
        { aliShow ? <RadioItem className="radioItem" thumb={<Icon size="lg" type={require(`../assets/svg/ali.svg`)} />} key={0} checked>
          支付宝 <div className="recommend"><img src={recommendImg} /></div>
          <Brief>数亿用户都在用，安全可托付</Brief>
        </RadioItem>: <span />}
        { weShow ? <RadioItem className="radioItem" thumb={<Icon size="lg" type={require(`../assets/svg/we.svg`)} />} key={1} checked>
            微信支付 <div className="recommend"><img src={recommendImg} /></div>
          <Brief>亿万用户的选择，更快更安全</Brief>
        </RadioItem> : <span />}
        {!aliShow && !weShow ? (<div><RadioItem className="radioItem" thumb={<Icon size="lg" type={require(`../assets/svg/ali.svg`)} />} checked={this.state.aliPay} key={0} onChange={() => this.onPayChange(0)}>
          支付宝 <div className="recommend"><img src={recommendImg} /></div>
          <Brief>数亿用户都在用，安全可托付</Brief>
        </RadioItem><RadioItem className="radioItem" thumb={<Icon size="lg" type={require(`../assets/svg/we.svg`)} />} key={1} checked={this.state.wePay} onChange={() => this.onPayChange(1)}>
            微信支付 <div className="recommend"><img src={recommendImg} /></div>
          <Brief>亿万用户的选择，更快更安全</Brief>
        </RadioItem></div>) : <span />}
      </List>
      <WingBlank>
        <div style={{ marginTop: '0.3rem', fontSize: '0.25rem', color: '#888', lineHeight: '0.5rem', height: '0.5rem' }}>
          <span style={{ float: 'left', marginTop: '0.08rem', marginRight: '0.1rem' }}><Icon size="xs" type={require('../assets/svg/info.svg')} />
          </span>
          请于付款后15分钟内离场，超时将加收停车费
        </div>
        <Button type="primary" disabled={this.state.disabled} style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} onClick={this.pay.bind(this)}>立即付款</Button>
      </WingBlank>
      <form ref={ (form) => this.form = form} method="post">
        <input type="hidden" name="couponCode" value={this.state.under==1?"":this.props.discount} />
        <input type="hidden" name="subject" value={'海峡茶城停车缴费'} />
        <input type="hidden" name="plateNumber" value={this.state.plateNum} />
        <input type="hidden" name="total" value={this.state.fee} />
	      <input type="hidden" name="phone" value={this.props.phone} />
      </form>
    </div>
    );
  }
}
function mapStateToProp(state) {
  return {
    plateNum: state.carReducer.plateNum,
    plateRegion: state.carReducer.plateRegion,
    phone:state.carReducer.phone,
    discount: state.carReducer.discount
  };
}
function mapDispatchToProp(dispatch) {
  return {
    addPay: (totalAmount) => {
      dispatch(addPay(totalAmount));
    }
  };
}
export default connect(mapStateToProp, mapDispatchToProp)(Pay);
