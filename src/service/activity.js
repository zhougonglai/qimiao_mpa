import request from '~/utils/request';

export const getSetting = async body => await request(`${import.meta.env.VITE_BASE_PATH}tools/setting`,{
  method: 'post',
  body: JSON.stringify(body)
});

export const getActivity = async (id, params) => await request(`${import.meta.env.VITE_BASE_PATH}api/activity/${id}?${new URLSearchParams(params)}`);

export const getPackageLevel = async body => await request(`${import.meta.env.VITE_BASE_PATH}api/user/package/level`, {
  method: 'post',
  body: JSON.stringify(body)
});

export const getActivitySpecialPackage = async params => await request(`${import.meta.env.VITE_BASE_PATH}api/activity_special/package?${new URLSearchParams(params)}`);

export const getToolsPackage = async params => await request(`${import.meta.env.VITE_BASE_PATH}tools/package/price?${new URLSearchParams(params)}`);

export const getActivityPackage = async params => await request(`${import.meta.env.VITE_BASE_PATH}api/activity/package?${new URLSearchParams(params)}`);

export const getInvoicePrice = async body => await request(`${import.meta.env.VITE_BASE_PATH}api/user/invoice/price`,{
  method: 'post',
  body: JSON.stringify(body)
});

export const packageBuy = async body => await request(`${import.meta.env.VITE_BASE_PATH}api/user/package/buy`,{
  method: 'post',
  body: JSON.stringify(body)
});


export const getActivityPresent = async body => await request(`${import.meta.env.VITE_BASE_PATH}api/activity/present`, {
  method: 'post',
  body: JSON.stringify(body)
});

export const getPrizeList = async body => await request(`${import.meta.env.VITE_BASE_PATH}api/user/prize_list`, {
  method: 'post',
  body: JSON.stringify(body)
});

export const userReceive = async body => await request(`${import.meta.env.VITE_BASE_PATH}api/user/receive`, {
  method: 'post',
  body: JSON.stringify(body)
});

export const activityDraw = async body => await request(`${import.meta.env.VITE_BASE_PATH}api/activity/draw`, {
  method: 'post',
  body: JSON.stringify(body)
});

export const invoiceState = async body => await request(`${import.meta.env.VITE_BASE_PATH}api/user/invoice/state`, {
  method: 'post',
  body: JSON.stringify(body)
});
