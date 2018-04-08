import { API_ROOT } from './config';

const api = {
  parkInfo: '/api/v1/park/getParkInfo',
  feeCalc: '/api/v1/park/feeCalc',
  checkCoupon: '/api/v1/pay/checkCoupon',
  PreCreateTrade: '/api/v1/pay/preCreateTrade', 
  QueryTradeStatus: '/api/v1/pay/queryTradeStatus',
  PayInfo: '/api/v1/pay/payInfo',
  WxWapPay: '/api/v1/pay/wxWapPay',
  GetOpenId: '/api/v1/pay/getOpenId',
  GetCarouselData: '/api/v1/carousel/list',
};

const ParkInfoResource = API_ROOT.concat(api.parkInfo);
const FeeCalcResource = API_ROOT.concat(api.feeCalc);
const CheckCouponResource = API_ROOT.concat(api.checkCoupon);
const preCreateTradeResource = API_ROOT.concat(api.PreCreateTrade);
const queryTradeStatusResource = API_ROOT.concat(api.QueryTradeStatus);
const payInfoResource = API_ROOT.concat(api.PayInfo);
const wxWapPay = API_ROOT.concat(api.WxWapPay);
const getOpenId = API_ROOT.concat(api.GetOpenId);
const getCarouselData = API_ROOT.concat(api.GetCarouselData);
export {
  ParkInfoResource,
  FeeCalcResource,
  CheckCouponResource,
  preCreateTradeResource,
  queryTradeStatusResource,
  payInfoResource,
  wxWapPay,
  getOpenId,
  getCarouselData
};