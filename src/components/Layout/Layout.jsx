import { Outlet, ScrollRestoration, useNavigation } from 'react-router-dom';
import { Navbar } from './Navbar';

export const loader = ({ request }) => {
  const url = new URL(request.url);
  const search = url.searchParams.get('search');

  return { search };
};

export const Layout = () => {
  const navigation = useNavigation();

  return (
    <>
      <ScrollRestoration />
      <section className={navigation.state === 'loading' ? "blur" : ''}>
        <Navbar />
        <Outlet />
      </section>
    </>
  );
};
