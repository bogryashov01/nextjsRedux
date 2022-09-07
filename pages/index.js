import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Components
import Layout from '../components/Layout';

// styles
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();
  const { query, pathname } = router;
  return (
    <Layout>
      <div className={styles.linkBlock}>
        <Link
          href={`articles?page=1&historypath=${
            query.historypath ? query?.historypath?.split(',')?.concat(router.pathname) : pathname
          }`}>
          <button className={styles.link}>See all articles</button>
        </Link>
      </div>
    </Layout>
  );
}
