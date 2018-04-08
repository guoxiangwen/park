import HTTP from '../http/index';
import {
  ParkInfoResource,
  FeeCalcResource,
  CheckCouponResource,
  preCreateTradeResource,
  queryTradeStatusResource,
  payInfoResource,
  wxWapPay,
  getOpenId,
  getCarouselData
} from './resource';

export default {
  getParkInfoResource(data) {
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
  getOpenId(data) {
    return HTTP.Post(getOpenId, data);
  },
  getCarouselData(data) {
    return HTTP.Post(getCarouselData, data);
  }
};

