import { Link, Form, redirect } from 'react-router-dom';

import takingNoteManGif from '../../assets/man-taking-note.png';
import { COMMENT, GREEN, PURPLE } from '../../helpers/colors';

import { addContact } from '../../services/contactService';

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const contactObj = Object.fromEntries(formData);

    await addContact(contactObj);

    return redirect('/');
  } catch (e) {
    throw myError(e.errMessage, e.status);
  }
};

export const AddContact = () => {
  return (
    <section className='p-3'>
      <img
        src={takingNoteManGif}
        height='400px'
        style={{
          position: 'absolute',
          zIndex: '-1',
          top: '130px',
          left: '100px',
          opacity: '50%',
        }}
      />
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <p className='h4 fw-bold text-center' style={{ color: GREEN }}>
              ساخت مخاطب جدید
            </p>
          </div>
        </div>
        <hr style={{ backgroundColor: GREEN }} />
        <div className='row mt-5'>
          <div className='col-md-4'>
            <Form method='post'>
              <div className='mb-2'>
                <input
                  name='firstName'
                  type='text'
                  className='form-control'
                  placeholder='نام'
                  required={true}
                />
              </div>
              <div className='mb-2'>
                <input
                  name='lastName'
                  type='text'
                  className='form-control'
                  placeholder='نام خانوادگی'
                  required={true}
                />
              </div>
              <div className='mb-2'>
                <input
                  name='photo'
                  type='text'
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
                  required={true}
                  placeholder='شماره موبایل'
                />
              </div>
              <div className='mb-2'>
                <input
                  type='email'
                  name='email'
                  className='form-control'
                  required={true}
                  placeholder='آدرس ایمیل'
                />
              </div>
              <div className='mx-2'>
                <input
                  type='submit'
                  className='btn'
                  style={{ backgroundColor: PURPLE }}
                  value='ساخت مخاطب'
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
        </div>
      </div>
    </section>
  );
};
