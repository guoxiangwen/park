import HTTP from "../http/index";
import {
  ParkInfoResource,
  FeeCalcResource,
  CheckCouponResource,
  preCreateTradeResource,
  queryTradeStatusResource,
  payInfoResource,
  wxWapPay,
  getOpenId,
  getCarouselData,
  getParkInfoWithGateNo,
  wxWapPayNew,
  // aliWapPayNew
} from "./resource";

export default {
  getParkInfoWithGateNo(data) {
    return HTTP.Get(getParkInfoWithGateNo, data);
  },
  getParkInfoResource(data = {}) {
    return HTTP.Get(ParkInfoResource, data);
  },
  getFeeCalcResource(data) {
    return HTTP.Get(FeeCalcResource, data);
  },
  checkCouponResource(data) {
    return HTTP.Post(CheckCouponResource, data);
  },
  preCreateTradeResource(data) {
    return HTTP.Post(preCreateTradeResource, data);
  },
  queryTradeStatusResource(data) {
    return HTTP.Post(queryTradeStatusResource, data);
  },
  payInfoResource(data) {
    return HTTP.Post(payInfoResource, data);
  },
  wxWapPay(data) {
    return HTTP.Post(wxWapPay, data);
  },
  wxWapPayNew(data) {
    return HTTP.Post(wxWapPayNew, data);
  },
  getOpenId(data) {
    return HTTP.Post(getOpenId, data);
  },
  getCarouselData(data) {
    return HTTP.Post(getCarouselData, data);
  }
};
