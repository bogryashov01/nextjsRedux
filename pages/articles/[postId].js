import { useRouter } from 'next/router';

import { useSelector } from 'react-redux';
import { setCurrentPost, postData } from '../../redux/slices/posts';
import { wrapper } from '../../redux/store';
import Layout from '../../components/Layout';

// styles
import styles from '../../styles/Post.module.css';
import Link from 'next/link';

export default function Post() {
  const router = useRouter();
  const { query, pathname } = router;
  const post = useSelector(postData.currentPost);
  return (
    <Layout>
      <div className={styles.post}>
        <h2>Title: {post?.title}</h2>
        <p>Body : {post?.body}</p>
        <Link
          href={`/articles?page=1&historypath=${
            query.historypath ? query?.historypath?.split(',')?.concat(router.pathname) : ''
          }`}>
          <button className={styles.link}>See all articles</button>
        </Link>
      </div>
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query }) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${query.postId}`);

    const post = await response.json();

    store.dispatch(setCurrentPost(post));

    return { props: {} };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
});
