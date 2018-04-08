import { addCar } from '../redux/actions/car';

export const init = (store) => {
  let plateNum = localStorage.plateNum;
  let plateRegion = '';
  if (localStorage.plateRegion) {
    plateRegion = localStorage.plateRegion;
  } else {
    plateRegion = '川';
  }
  const plateRegionIndex = localStorage.plateRegionIndex | 22;
  let phone = '';
  if (localStorage.phone) {
    phone = localStorage.phone;
  }
  let discount = '';
  if (localStorage.discount) {
    discount = localStorage.discount;
  }
  if (plateNum) {
    plateNum = plateNum.split(',');
  } else {
    plateNum = [];
  }
  store.dispatch(addCar(plateRegion, plateNum, phone, plateRegionIndex, discount));
};