import Link from 'next/link';
import { useSelector } from 'react-redux';
import { setPosts, postData } from '../redux/slices/posts';
import { store, wrapper } from '../redux/store';
import MainContainer from './components/MainContainer';

// styles
import styles from '../styles/Posts.module.css';

export default function Posts() {
  const posts = useSelector(postData.postsData);
  return (
    <MainContainer>
      <h1 className={styles.title}>List of Posts</h1>
      <div className={styles.postblock}>
        {posts?.map((post) => {
          return (
            <li key={post.id} className={styles.postItem}>
              <div>
                <a>Title : {post.title}</a>
                <p>Body: {post.body}</p>
              </div>
              <Link href={`/articles/${post.id}`}>
                <button className={styles.readMore}>Read more</button>
              </Link>
            </li>
          );
        })}
      </div>
    </MainContainer>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    const posts = await response.json();

    store.dispatch(setPosts(posts));

    return { props: {} };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
});
