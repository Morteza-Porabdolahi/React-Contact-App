import { axios } from '../helpers/axiosInstance';

export const getContacts = async (q = '') => {
  try {
    const { data } = await axios.get(`/contacts?q=${q}`);

    return data;
  } catch (e) {
    throw {
      status: e.response.status,
      errMessage: e.response.data?.messagee || e.message,
    };
  }
};
