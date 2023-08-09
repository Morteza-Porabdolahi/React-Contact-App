import { useLoaderData, Link } from 'react-router-dom';

import { getContact } from '../../services/contactService';
import { myError } from '../SharedComponents/ErrorPage';

import { CURRENTLINE, CYAN, PURPLE } from '../../helpers/colors';

export const loader = async ({ params }) => {
  try {
    const contact = await getContact(params.contactId);

    return contact;
  } catch (e) {
    throw myError(
      e.status === 400
        ? 'malformed request syntax'
        : e.status === 404
        ? 'Contact Not Found !'
        : 'An Error Occured !',
      e.status
    );
  }
};

export const ViewContact = () => {
  const contact = useLoaderData();

  return (
    <>
      <section className='view-contact-intro p3'>
        <div className='container'>
          <div className='row my-2 text-center'>
            <p className='h3 fw-bold' style={{ color: CYAN }}>
              اطلاعات مخاطب
            </p>
          </div>
        </div>
      </section>

      <hr style={{ backgroundColor: CYAN }} />
      <section className='view-contact mt-e'>
        <div
          className='container p-2'
          style={{ borderRadius: '1em', backgroundColor: CURRENTLINE }}
        >
          <div className='row align-items-center'>
            <div className='col-md-3'>
              <img
                src={contact.photo}
                alt={contact.firstName}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200';
                }}
                className='img-fluid rounded'
                style={{ border: `1px solid ${PURPLE}` }}
              />
            </div>
            <div className='col-md-9'>
              <ul className='list-group'>
                <li className='list-group-item list-group-item-dark'>
                  نام : <span className='fw-bold'>{contact.firstName}</span>
                </li>
                <li className='list-group-item list-group-item-dark'>
                  نام و نام خانوادگی :{' '}
                  <span className='fw-bold'>{contact.lastName}</span>
                </li>
                <li className='list-group-item list-group-item-dark'>
                  شماره موبایل :{' '}
                  <span className='fw-bold'>{contact.phone}</span>
                </li>
                <li className='list-group-item list-group-item-dark'>
                  ایمیل : <span className='fw-bold'>{contact.email}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className='row my-2'>
            <div className='d-grid gap-2 col-6 mx-auto'>
              <Link
                to={'/'}
                className='btn'
                style={{ backgroundColor: PURPLE }}
              >
                برگشت به صفحه اصلی
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
