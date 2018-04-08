import { ADD_CAR, RESET_CAR } from './actionstype';


export const addCar = (plateRegion, plateNum, phone, plateRegionIndex, discount) => {
  localStorage.setItem('plateRegion', plateRegion);
  localStorage.setItem('plateNum', plateNum);
  localStorage.setItem('phone', phone);
  localStorage.setItem('plateRegionIndex', plateRegionIndex);
  localStorage.setItem('discount', discount);
  return { type: ADD_CAR, payload: { plateRegion, plateNum, phone, plateRegionIndex, discount } };
};

export const resetCar = () => {
  localStorage.removeItem('plateRegion');
  localStorage.removeItem('plateNum');
  localStorage.removeItem('phone');
  localStorage.removeItem('plateRegionIndex');
  localStorage.removeItem('discount');
  return { type: RESET_CAR };
};

