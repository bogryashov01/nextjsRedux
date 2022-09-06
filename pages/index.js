import Link from 'next/link';
import { useRouter } from 'next/router';

// Components
import Layout from '../components/Layout';

// styles
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <Layout>
      <div className={styles.linkBlock}>
        <Link href="/articles?page=1">
          <a className={styles.link}> See all articles</a>
        </Link>
      </div>
    </Layout>
  );
}
