import request from '~/utils/request';


export const getActivity = async (id, params) => await request(`${import.meta.env.VITE_BASE_PATH}api/activity/${id}?${new URLSearchParams(params)}`);

export const getActivitySpecialPackage = async params => await request(`${import.meta.env.VITE_BASE_PATH}api/activity_special/package?${new URLSearchParams(params)}`);

export const getToolsPackage = async params => await request(`${import.meta.env.VITE_BASE_PATH}tools/package/price?${new URLSearchParams(params)}`);

export const getActivityPackage = async params => await request(`${import.meta.env.VITE_BASE_PATH}api/activity/package?${new URLSearchParams(params)}`);

export const getActivityPresent = async body => await request(`${import.meta.env.VITE_BASE_PATH}api/activity/present`, {
  method: 'post',
  body: JSON.stringify(body)
});

export const getPrizeList = async body => await request(`${import.meta.env.VITE_BASE_PATH}api/user/prize_list`, {
  method: 'post',
  body: JSON.stringify(body)
});

export const activityDraw = async body => await request(`${import.meta.env.VITE_BASE_PATH}api/activity/draw`, {
  method: 'post',
  body: JSON.stringify(body)
});
