import { Link, redirect, useLoaderData, Form } from 'react-router-dom';

import { getContact, updateContact } from '../../services/contactService';
import { myError } from '../SharedComponents/ErrorPage';

import takingNoteMan from '../../assets/man-taking-note.png';
import { COMMENT, ORANGE, PURPLE } from '../../helpers/colors';

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

export const action = async ({ request, params }) => {
  try {
    const formData = await request.formData();
    const newContact = Object.fromEntries(formData);

    await updateContact(params.contactId, newContact);

    return redirect('/');
  } catch (e) {
    throw myError(e.errMessage, e.status);
  }
};

export const EditContact = () => {
  const contact = useLoaderData();

  return (
    <section className='p-3'>
      <div className='container'>
        <div className='row my-2'>
          <div className='col text-center'>
            <p className='h4 fw-bold' style={{ color: ORANGE }}>
              ویرایش مخاطب
            </p>
          </div>
        </div>
        <hr style={{ backgroundColor: ORANGE }} />
        <div
          className='row p-2 w-75 mx-auto align-items-center'
          style={{ backgroundColor: '#44475a', borderRadius: '1em' }}
        >
          <div className='col-md-8'>
            <Form method='put'>
              <div className='mb-2'>
                <input
                  name='firstName'
                  type='text'
                  className='form-control'
                  defaultValue={contact.firstName}
                  required={true}
                  placeholder='نام'
                />
              </div>
              <div className='mb-2'>
                <input
                  name='lastName'
                  type='text'
                  className='form-control'
                  defaultValue={contact.lastName}
                  required={true}
                  placeholder='نام خانوادگی'
                />
              </div>
              <div className='mb-2'>
                <input
                  name='photo'
                  type='text'
                  defaultValue={contact.photo}
                  className='form-control'
                  required={true}
                  placeholder='آدرس تصویر'
                />
              </div>
              <div className='mb-2'>
                <input
                  name='phone'
                  type='number'
                  className='form-control'
                  defaultValue={contact.phone}
                  required={true}
                  placeholder='شماره موبایل'
                />
              </div>
              <div className='mb-2'>
                <input
                  name='email'
                  type='email'
                  className='form-control'
                  defaultValue={contact.email}
                  required={true}
                  placeholder='آدرس ایمیل'
                />
              </div>
              <div className='mb-2'>
                <input
                  type='submit'
                  className='btn'
                  style={{ backgroundColor: PURPLE }}
                  defaultValue='ویرایش مخاطب'
                />
                <Link
                  to={'/'}
                  className='btn mx-2'
                  style={{ backgroundColor: COMMENT }}
                >
                  انصراف
                </Link>
              </div>
            </Form>
          </div>
          <div className='col-md-4'>
            <img
              src={contact.photo}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/200';
              }}
              className='img-fluid rounded'
              style={{ border: `1px solid ${PURPLE}` }}
            />
          </div>
        </div>
      </div>

      <div className='text-center mt-1'>
        <img src={takingNoteMan} height='300px' style={{ opacity: '60%' }} />
      </div>
    </section>
  );
};
