import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Posts.module.css';
function Post(props) {
  const router = useRouter();
  const { data } = props;
  const { query } = router;

  return (
    <>
      <div>
        <a>Title : {data?.title}</a>
        <p>Body: {data?.body}</p>
      </div>
      <Link
        href={`/articles/${data?.id}?historypath=${query?.historypath
          ?.split(',')
          ?.concat(router.pathname)}`}>
        <button className={styles.readMore}>Read more</button>
      </Link>
    </>
  );
}
export default Post;
