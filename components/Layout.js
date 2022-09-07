import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Breadcrumbs from './Breadcrumbs';

const Layout = ({ children }) => {
  const router = useRouter();
  const { query, pathname } = router;
  const breadcrumbsPath = query?.historypath?.split(',');
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const bredcrumbsArray = [];

  useEffect(() => {
    if (router) {
      breadcrumbsPath?.forEach((path, i) => {
        console.log({ breadcrumb: path, href: path });
        bredcrumbsArray.push({ breadcrumb: path, href: path });
      });
      setBreadcrumbs(bredcrumbsArray);
    }
  }, [pathname, router]);

  return (
    <>
      <nav className={styles.navbar}>
        <Link
          href={`/?historypath=${
            query.historypath ? query?.historypath?.split(',')?.concat(router.pathname) : '/'
          }`}>
          <button className={styles.navlink}>Home</button>
        </Link>
        <Link
          href={`articles?page=1&historypath=${
            query.historypath ? query?.historypath?.split(',')?.concat(router.pathname) : ''
          }`}>
          <button className={styles.navlink}>Articles</button>
        </Link>
      </nav>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div>{children}</div>
    </>
  );
};

export default Layout;
