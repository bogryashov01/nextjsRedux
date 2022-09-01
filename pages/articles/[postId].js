import Link from 'next/link';

import { useSelector } from 'react-redux';
import { setCurrentPost, postData } from '../../redux/slices/posts';
import { store, wrapper } from '../../redux/store';
import MainContainer from '../components/MainContainer';

// styles
import styles from '../../styles/Post.module.css';

export default function Post() {
  const post = useSelector(postData.currentPost);
  return (
    <MainContainer>
      <div className={styles.post}>
        <h2>Title: {post?.title}</h2>
        <p>Body : {post?.body}</p>

        <Link href="/articles">
          <button className={styles.seeAllButton}>see all articles</button>
        </Link>
      </div>
    </MainContainer>
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