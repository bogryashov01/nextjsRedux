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
      const pathArray = [];
      const linkPath = router.asPath.split('/');
      linkPath.shift();
      linkPath.forEach((path, i) => {
        pathArray.push({ breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') });
      });
      setBreadcrumbs(pathArray);
    }
  }, [router]);
  console.log(breadcrumbs);

  return (
    <>
      <nav className={styles.navbar}>
        <Link href={'/home'}>
          <a className={styles.navlink}>Home</a>
        </Link>
        <Link href={'/articles'}>
          <a className={styles.navlink}>List of Posts</a>
        </Link>
      </nav>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div>{children}</div>
    </>
  );
};

export default Layout;
