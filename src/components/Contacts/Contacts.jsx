import { Link, useLoaderData } from 'react-router-dom';

import { Contact } from '../Contact/Contact';

import NotFoundGif from '../../assets/not-found.gif';
import { CURRENTLINE, FOREGROUND, ORANGE, PINK } from '../../helpers/colors';

import { getContacts } from '../../services/contactsService';
import { myError } from '../SharedComponents/ErrorPage';

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const search = url.searchParams.get('search') || '';

  try {
    const contacts = await getContacts(search);

    return contacts;
  } catch (e) {
    throw myError(e.errMessage, e.status);
  }
};

export const Contacts = () => {
  const contacts = useLoaderData();

  return (
    <div>
      <section className='container'>
        <div className='grid'>
          <div className='row'>
            <div className='col'>
              <p className='h3 text-center'>
                <Link
                  to={'/contacts/add'}
                  className='btn m-4'
                  style={{ backgroundColor: PINK, color: FOREGROUND }}
                >
                  ساخت مخاطب جدید
                  <i className='fa fa-plus-circle mx-2 align-middle' />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className='container'>
        <div className='row'>
          {contacts.length > 0 ? (
            contacts.map((c) => <Contact key={c.id} contact={c} />)
          ) : (
            <div
              className='text-center py-5 rounded'
              style={{ backgroundColor: CURRENTLINE }}
            >
              <p className='h3' style={{ color: ORANGE }}>
                مخاطب یافت نشد ...
              </p>
              <img src={NotFoundGif} alt='پیدا نشد' className='w-25' />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
