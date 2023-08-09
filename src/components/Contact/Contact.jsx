import Swal from 'sweetalert2';
import { Link, useFetcher, useNavigation } from 'react-router-dom';

import {
  BACKGROUND,
  CURRENTLINE,
  CYAN,
  ORANGE,
  PURPLE,
  RED,
} from '../../helpers/colors';

export const Contact = ({ contact }) => {
  const fetcher = useFetcher();
  const navigation = useNavigation();

  console.log(navigation);
  const submitRemove = async () => {
    const { isConfirmed } = await Swal.fire({
      title: `برای حذف مخاطب با نام ${contact.firstName} مطمئن هستید؟`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: RED,
      cancelButtonColor: CYAN,
      cancelButtonText: 'لغو',
      background: BACKGROUND,
      confirmButtonText: 'حذف مخاطب',
      showLoaderOnConfirm: true,
      preConfirm:async () => {
        return fetcher.submit(
          {},
          { method: 'delete', action: `/contacts/${contact.id}/remove` }
        );
      },
      customClass: {
        title: 'text-white',
      },
    });

    if (isConfirmed) {
      Swal.fire({
        icon: 'success',
        background: BACKGROUND,
        title: 'حذف شد !',
        customClass: {
          title: 'text-white',
        },
      });
    }
  };

  return (
    <>
      <div className='col-md-6'>
        <div style={{ backgroundColor: CURRENTLINE }} className='card my-2'>
          <div className='card-body'>
            <div className='row align-items-center d-flex justify-content-around'>
              <div className='col-md-4 col-sm-4'>
                <img
                  src={contact.photo}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200';
                  }}
                  alt={contact.firstName}
                  style={{ border: `1px solid ${PURPLE}` }}
                  className='img-fluid rounded'
                />
              </div>
              <div className='col-md-7 col-sm-7'>
                <ul className='list-group'>
                  <li className='list-group-item list-group-item-dark'>
                    نام و نام خانوداگی :{'  '}
                    <span className='fw-bold'>
                      {contact.firstName} {contact.lastName}
                    </span>
                  </li>

                  <li className='list-group-item list-group-item-dark'>
                    شماره موبایل :{'  '}
                    <span className='fw-bold'>{contact.phone}</span>
                  </li>

                  <li className='list-group-item list-group-item-dark'>
                    آدرس ایمیل :{'  '}
                    <span className='fw-bold'>{contact.email}</span>
                  </li>
                </ul>
              </div>
              <div className='col-md-1 col-sm-1 d-flex flex-column align-items-center'>
                <Link
                  to={`/contacts/${contact.id}`}
                  className='btn my-1'
                  style={{ backgroundColor: ORANGE }}
                >
                  <i className='fa fa-eye' />
                </Link>

                <Link
                  to={`/contacts/${contact.id}/edit`}
                  className='btn my-1'
                  style={{ backgroundColor: CYAN }}
                >
                  <i className='fa fa-pen' />
                </Link>
                <button
                  onClick={submitRemove}
                  className='btn my-1'
                  style={{ backgroundColor: RED }}
                >
                  <i className='fa fa-trash' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
