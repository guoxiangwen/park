import React from "react";
import {
  Flex,
  Button,
  Modal,
  Icon,
  Popup,
  WingBlank,
  List,
  InputItem,
  Carousel
} from "antd-mobile";
import { connect } from "react-redux";
import { addCar } from "../redux/actions/car";
import API from "../api/";
import { getUrlPara } from "../utils/";
import { isWeiXin } from "../utils/";
import "../assets/less/plate.less";
import { APPID } from "../api/config";

const FlexItem: any = Flex.Item;
const alert = Modal.alert;
const isIPhone = new RegExp("\\biPhone\\b|\\biPod\\b", "i").test(
  window.navigator.userAgent
);
let maskProps;
if (isIPhone) {
  // Note: the popup content will not scroll.
  maskProps = {
    onTouchStart: e => e.preventDefault()
  };
}

export interface PlateinfoProps {
  plateRegionIndex: number;
  plateRegion: string;
  plateNum: Array<string>;
  phone: string;
  discount: string;
  history: any;
  addCar: (
    plateRegion: string,
    plateNum: Array<string>,
    phone: string,
    plateRegionIndex: number,
    discount: string
  ) => void;
}
export interface PlateinfoState {
  plateRegionIndex: number;
  plateNum: Array<any>;
  plateRegion: string;
  phone: string;
  discount: string;
  cpn: string;
  carouselData: Array<any>;
  initialHeight: any;
}
class Plateinfo extends React.Component<PlateinfoProps, PlateinfoState> {
  constructor() {
    super();
    this.state = {
      plateRegionIndex: 0,
      plateNum: [],
      plateRegion: "",
      phone: "",
      discount: "",
      cpn: "",
      carouselData: [],
      initialHeight: 200
    };
  }

  componentDidMount() {
    document.title = "填写停车信息";
    const getDiscount = getUrlPara("discount");
    this.setState({
      plateRegionIndex: this.props.plateRegionIndex,
      plateRegion: this.props.plateRegion,
      plateNum: this.props.plateNum,
      phone: this.props.phone,
      discount: getDiscount,
      cpn: this.props.plateNum.join("")
    });
    const isWxs = isWeiXin();
    const wxCode = getUrlPara("code");
    if ((isWxs && wxCode) || !isWxs) {
      if (isWxs) {
        if (
          localStorage.getItem("wxopenid") == null ||
          localStorage.getItem("wxopenid") == "undefined"
        ) {
          API.getOpenId({
            code: wxCode
          }).then((res: any) => {
            if (res.data.code === 200) {
              localStorage.setItem("wxopenid", res.data.payload);
            } else {
              //出错提示刷新页面
              // Toast.info(`openId get failed ${res.data.payload}`, 3, ()=>{}, true);
            }
          });
        }
      }
    } else {
      const encodedUri = encodeURI(window.location.href);
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${encodedUri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
    }
    if (getDiscount) {
      API.checkCouponResource({
        couponCode: getDiscount
      }).then((res: any) => {
        if (res.data.code !== 200) {
          alert("优惠券提示", `${res.data.msg},是否继续？`, [
            { text: "取消", onPress: () => {} },
            {
              text: "继续",
              onPress: () => {
                this.setState({
                  ...this.state,
                  discount: ""
                });
              },
              style: { fontWeight: "bold" }
            }
          ]);
        }
      });
    }
    API.getCarouselData({}).then((res: any) => {
      if (res.data.code === 200) {
        this.setState({
          ...this.state,
          carouselData: res.data.payload
        });
      }
    });
  }
  handlePlateNumChange(e) {
    const value = e.target.value.toUpperCase();
    if (value.length < 7) {
      this.setState({
        cpn: e.target.value,
        plateNum: value.split("")
      });
    }
  }
  onClose() {
    Popup.hide();
  }
  selected(index, name) {
    this.setState({
      ...this.state,
      plateRegionIndex: index,
      plateRegion: name
    });
    this.onClose();
  }
  chooseCPNk() {
    Popup.show(
      <div className="popup">
        <div className="title">
          请选择车牌所属省份
          <span className="close" onClick={() => this.onClose()}>
            <Icon type="cross" />
          </span>
        </div>
        <ul className="cpnlist">
          {[
            "京",
            "津",
            "冀",
            "晋",
            "蒙",
            "辽",
            "吉",
            "黑",
            "沪",
            "苏",
            "浙",
            "皖",
            "闽",
            "赣",
            "鲁",
            "豫",
            "鄂",
            "湘",
            "粤",
            "桂",
            "琼",
            "渝",
            "川",
            "贵",
            "云",
            "藏",
            "陕",
            "甘",
            "青",
            "宁",
            "港",
            "澳"
          ].map((i, index) => (
            <li
              key={index}
              className={
                this.state.plateRegionIndex === index ? "item active" : "item"
              }
              onClick={() => {
                this.selected(index, i);
              }}
            >
              {i}
            </li>
          ))}
        </ul>
      </div>,
      { animationType: "slide-up", maskProps, maskClosable: false }
    );
  }
  addPlate() {
    const terminal = getUrlPara("terminal");
    if (this.state.discount) {
      API.checkCouponResource({
        couponCode: this.state.discount
      }).then((res: any) => {
        if (res.data.code === 200) {
          this.props.addCar(
            this.state.plateRegion,
            this.state.plateNum,
            this.state.phone,
            this.state.plateRegionIndex,
            this.state.discount
          );
          if (terminal) {
            this.props.history.push(
              `/pay?terminal=${terminal}&couponCash=${res.data.data.value}`
            );
          } else {
            this.props.history.push(`/pay?couponCash=${res.data.data.value}`);
          }
        } else {
          alert("优惠券提示", `${res.data.msg},是否继续？`, [
            { text: "取消", onPress: () => console.log("cancel") },
            {
              text: "继续",
              onPress: () => {
                this.props.addCar(
                  this.state.plateRegion,
                  this.state.plateNum,
                  this.state.phone,
                  this.state.plateRegionIndex,
                  this.state.discount
                );
                if (terminal) {
                  this.props.history.push(
                    `/pay?terminal=${terminal}&couponCash=0`
                  );
                } else {
                  this.props.history.push("/pay?couponCash=0");
                }
              },
              style: { fontWeight: "bold" }
            }
          ]);
        }
      });
    } else {
      this.props.addCar(
        this.state.plateRegion,
        this.state.plateNum,
        this.state.phone,
        this.state.plateRegionIndex,
        this.state.discount
      );
      if (terminal) {
        this.props.history.push(`/pay?terminal=${terminal}&couponCash=0`);
      } else {
        this.props.history.push("/pay?couponCash=0");
      }
    }
  }
  handlePhoneChange(value) {
    this.setState({
      ...this.state,
      phone: value
    });
  }
  handleDiscountChange(value) {
    this.setState({
      ...this.state,
      discount: value
    });
  }
  render() {
    const hProp = this.state.initialHeight
      ? { height: this.state.initialHeight }
      : {};
    const isWxs = isWeiXin();
    const wxCode = getUrlPara("code");

    return (
      <div>
        {(isWxs && wxCode) || !isWxs ? (
          <div>
            <Carousel
              className="my-carousel"
              autoplay
              infinite
              selectedIndex={1}
            >
              {this.state.carouselData.length > 0 &&
                this.state.carouselData.map((item: any) => (
                  <a key={item.id} href={item.href} style={hProp}>
                    <img
                      src={item.src}
                      alt=""
                      onLoad={() => {
                        // fire window resize event to change height
                        window.dispatchEvent(new Event("resize"));
                        this.setState({
                          initialHeight: null
                        });
                      }}
                    />
                  </a>
                ))}
            </Carousel>
            <Flex direction="column" className="plateInfo">
              <FlexItem className="plate">
                <div className="info">
                  <div className="region" onClick={this.chooseCPNk.bind(this)}>
                    <span>{this.state.plateRegion}</span>
                    <span className="down">
                      <Icon type="down" />
                    </span>
                    <span className="separator">|</span>
                  </div>
                  <div className="inputContainer">
                    <input
                      type="text"
                      style={{ letterSpacing: "0.34rem" }}
                      value={this.state.cpn}
                      onChange={this.handlePlateNumChange.bind(this)}
                    />
                    <div className="cpnContainer">
                      <div
                        className={
                          this.state.plateNum[0] != null ? "show" : "item"
                        }
                      >
                        {this.state.plateNum[0]}
                      </div>
                      <div
                        className={
                          this.state.plateNum[1] != null ? "show" : "item"
                        }
                      >
                        {this.state.plateNum[1]}
                      </div>
                      <div
                        className={
                          this.state.plateNum[2] != null ? "show" : "item"
                        }
                      >
                        {this.state.plateNum[2]}
                      </div>
                      <div
                        className={
                          this.state.plateNum[3] != null ? "show" : "item"
                        }
                      >
                        {this.state.plateNum[3]}
                      </div>
                      <div
                        className={
                          this.state.plateNum[4] != null ? "show" : "item"
                        }
                      >
                        {this.state.plateNum[4]}
                      </div>
                      <div
                        className={
                          this.state.plateNum[5] != null ? "show" : "item"
                        }
                      >
                        {this.state.plateNum[5]}
                      </div>
                    </div>
                  </div>
                </div>
              </FlexItem>
              <FlexItem style={{ color: "#fff" }}>
                请输入正确的车牌号！
              </FlexItem>
            </Flex>
            <List renderHeader={<span>如有优惠券码，请输入！</span>}>
              <InputItem
                placeholder="请输入优惠券码"
                onChange={this.handleDiscountChange.bind(this)}
                value={this.state.discount}
              >
                优惠券
              </InputItem>
            </List>
            <List renderHeader={<span>输入手机号进行离场短信提醒!</span>}>
              <InputItem
                placeholder="请输入手机号"
                onChange={this.handlePhoneChange.bind(this)}
                value={this.state.phone}
              >
                手机号
              </InputItem>
            </List>
            <WingBlank style={{ marginBottom: 20 }}>
              <Button
                type="primary"
                disabled={this.state.plateNum.length !== 6}
                className="confirm"
                onClick={this.addPlate.bind(this)}
              >
                下一步
              </Button>
            </WingBlank>
          </div>
        ) : null}
      </div>
    );
  }
}

function mapStateToProp(state) {
  return {
    plateNum: state.carReducer.plateNum,
    phone: state.carReducer.phone,
    plateRegion: state.carReducer.plateRegion,
    plateRegionIndex: state.carReducer.plateRegionIndex,
    discount: state.carReducer.discount
  };
}
function mapDispatchToProp(dispatch) {
  return {
    addCar: (plateRegion, plateNum, phone, plateRegionIndex, discount) => {
      dispatch(
        addCar(plateRegion, plateNum, phone, plateRegionIndex, discount)
      );
    }
  };
}
export default connect(mapStateToProp, mapDispatchToProp)(Plateinfo);
