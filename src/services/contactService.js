import { axios } from '../helpers/axiosInstance';

export const getContact = async (id = '') => {
  try {
    const { data } = await axios.get(`/contacts/${id}`);

    return data;
  } catch (e) {
    throw {
      status: e.response.status,
      errMessage: e.response.data?.messagee || e.message,
    };
  }
};

export const updateContact = async (id = '', newContact = {}) => {
  try {
    const { data } = await axios.put(`/contacts/${id}`, newContact);

    return data;
  } catch (e) {
    throw {
      status: e.response.status,
      errMessage: e.response.data?.messagee || e.message,
    };
  }
};

export const addContact = async (newContact = {}) => {
  try {
    const { data } = await axios.post('/contacts', newContact);

    return data;
  } catch (e) {
    throw {
      status: e.response.status,
      errMessage: e.response.data?.messagee || e.message,
    };
  }
};

export const removeContact = async (contactId = "") => {
  try {
    const { data } = await axios.delete(`/contacts/${contactId}`);

    return data;
  } catch (e) {
    throw {
      status: e.response.status,
      errMessage: e.response.data?.messagee || e.message,
    };
  }
};

