import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';
import Breadcrumbs from './Breadcrumbs';

const MainContainer = ({ children }) => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') };
      });
      setBreadcrumbs(pathArray);

      // setBreadcrumbs((prevState) => [...prevState, pathArray]);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Next App</title>
        <meta name="description" content="next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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

export default MainContainer;
