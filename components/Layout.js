import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Breadcrumbs from './Breadcrumbs';

const Layout = ({ children }) => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      console.log(linkPath);
      linkPath.shift();
      linkPath.forEach((path, i) => {
        setBreadcrumbs((prevState) => [
          ...prevState,
          { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') },
        ]);
      });
    }
  }, [router]);
  console.log(breadcrumbs);

  return (
    <>
      <nav className={styles.navbar}>
        <button
          className={styles.navlink}
          onClick={() => router.push('/', undefined, { shallow: true })}>
          Home
        </button>
        <button
          className={styles.navlink}
          onClick={() => router.push('/articles?page=1', undefined, { shallow: true })}>
          Articles
        </button>
      </nav>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div>{children}</div>
    </>
  );
};

export default Layout;
