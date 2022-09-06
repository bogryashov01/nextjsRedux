import Link from 'next/link';
import styles from '../styles/Posts.module.css';
function Post(props) {
  const { data } = props;
  return (
    <>
      <div>
        <a>Title : {data?.title}</a>
        <p>Body: {data?.body}</p>
      </div>
      <Link href={`/articles/${data?.id}`}>
        <button className={styles.readMore}>Read more</button>
      </Link>
    </>
  );
}
export default Post;
