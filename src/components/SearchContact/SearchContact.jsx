import { Form, useRouteLoaderData, useSubmit } from 'react-router-dom';
import { useEffect } from 'react';

import { debounce } from '../../helpers/utils';
import { PURPLE } from '../../helpers/colors';

export const SearchContact = () => {
  const { search } = useRouteLoaderData('layoutLoader');
  const submit = useSubmit();

  const debouncedSubmit = debounce(submit, 600);

  useEffect(() => {
    document.getElementById('search').value = search;
  }, []);

  return (
    <Form action='/'>
      <div className='input-group mx-2 w-75'>
        <span
          className='input-group-text'
          id='basic-addon1'
          style={{ backgroundColor: PURPLE }}
        >
          <i className='fas fa-search' />
        </span>
        <input
          dir='rtl'
          type='text'
          id='search'
          name='search'
          className='form-control'
          onChange={(e) => debouncedSubmit(e.currentTarget.form)}
          placeholder='جستجوی مخاطب'
          defaultValue={search}
          aria-label='Search'
          aria-describedby='basic-addon1'
        />
      </div>
    </Form>
  );
};
