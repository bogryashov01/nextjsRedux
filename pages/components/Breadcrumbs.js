import Link from 'next/link';
import styles from '../../styles/Breadcrumbs.module.css';

const Breadcrumbs = (props) => {
  const { breadcrumbs } = props;
  return (
    <div className={styles.breadcrumbsBlock}>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <nav key={index}>
            <Link href={breadcrumb?.href}>
              <a className={styles.breadcrumbItem}>{breadcrumb?.breadcrumb}</a>
            </Link>
          </nav>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
