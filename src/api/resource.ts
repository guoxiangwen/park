import { API_ROOT } from "./config";

const api = {
  parkInfo: "/api/v1/park/getParkInfo",
  feeCalc: "/api/v1/park/feeCalc",
  checkCoupon: "/api/v1/pay/checkCoupon",
  PreCreateTrade: "/api/v1/pay/preCreateTrade",
  QueryTradeStatus: "/api/v1/pay/queryTradeStatus",
  PayInfo: "/api/v1/pay/payInfo",
  WxWapPay: "/api/v1/pay/wxWapPay",
  AliWapPay: "/api/v1/pay/wapPay",
  WxWapPayNew: "/api/v1/pay/wxWapPayNew",
  AliWapPayNew: "/api/v1/pay/wapPayNew",
  GetOpenId: "/api/v1/pay/getOpenId",
  GetCarouselData: "/api/v1/carousel/list",
  //获取指定通道的停车费信息
  GetParkInfoWithGateNo: "/api/v1/park/getParkInfoWithGateNo"
};

const ParkInfoResource = API_ROOT.concat(api.parkInfo);
const FeeCalcResource = API_ROOT.concat(api.feeCalc);
const CheckCouponResource = API_ROOT.concat(api.checkCoupon);
const preCreateTradeResource = API_ROOT.concat(api.PreCreateTrade);
const queryTradeStatusResource = API_ROOT.concat(api.QueryTradeStatus);
const payInfoResource = API_ROOT.concat(api.PayInfo);
const wxWapPay = API_ROOT.concat(api.WxWapPay);
const aliWapPay = API_ROOT.concat(api.AliWapPay);
//新增支付
const wxWapPayNew = API_ROOT.concat(api.WxWapPayNew);
const aliWapPayNew = API_ROOT.concat(api.AliWapPayNew);
const getOpenId = API_ROOT.concat(api.GetOpenId);
const getCarouselData = API_ROOT.concat(api.GetCarouselData);
const getParkInfoWithGateNo = API_ROOT.concat(api.GetParkInfoWithGateNo);

export {
  ParkInfoResource,
  FeeCalcResource,
  CheckCouponResource,
  preCreateTradeResource,
  queryTradeStatusResource,
  payInfoResource,
  wxWapPay,
  aliWapPay,
  wxWapPayNew,
  aliWapPayNew,
  getOpenId,
  getCarouselData,
  getParkInfoWithGateNo
};
