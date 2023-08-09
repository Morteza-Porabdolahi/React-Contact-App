import { redirect } from 'react-router-dom';

import { removeContact } from '../../services/contactService';
import { myError } from '../SharedComponents/ErrorPage';

export const action = async ({ params }) => {
  try {
    await removeContact(params.contactId);

    return redirect('/');
  } catch (e) {
    throw myError(e.errMessage, e.status);
  }
};
