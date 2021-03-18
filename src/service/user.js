import request from '~/utils/request';

export const getUserInfo = async body => await request(`${import.meta.env.VITE_BASE_PATH}api/user/info`, {
  method: 'post',
  body: JSON.stringify(body)
});
