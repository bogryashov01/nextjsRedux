import Link from 'next/link';
import styles from '../styles/Breadcrumbs.module.css';

const Breadcrumbs = (props) => {
  const { breadcrumbs } = props;
  return (
    <div className={styles.breadcrumbsBlock}>
      {breadcrumbs?.slice(-6).map((breadcrumb, index) => {
        return (
          <nav key={index}>
            <Link href={breadcrumb?.href}>
              <a className={styles.breadcrumbItem}>
                {breadcrumb?.href == '/' ? 'home' : breadcrumb?.breadcrumb}
              </a>
            </Link>
          </nav>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
