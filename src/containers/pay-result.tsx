import React from 'react';
import { Result, Icon } from 'antd-mobile';
import { getUrlPara } from '../utils/';
import '../assets/less/pay-result.less';

export interface PayResultProps {

}
export interface PayResultState {
}
class PayResult extends React.Component<PayResultProps, PayResultState> {
  constructor() {
    super();
  }
  componentDidMount() {
    document.title = '支付详情';
    localStorage.removeItem('discount');
  }

  render() {
    const count:any = getUrlPara('total_amount');
    const status:any = getUrlPara('status');
    return <div className="payResult"> 
      { status === 'failed' ?  <Result
        img={<Icon type="cross-circle-o" className="icon" style={{ fill: '#F13642' }} />}
        title="订单生成失败"
        message="请检查网络环境，重试！"
      />:
    <Result
        className="success" img={<Icon type="check-circle" className="icon" style={{ fill: '#1F90E6' }} />}
        title="支付成功"
        message={<span>{count? `${count} 元`: ''}</span>}
      />}  
    </div>;
  }
}

export default PayResult;
