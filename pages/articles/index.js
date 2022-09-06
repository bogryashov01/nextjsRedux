import Link from 'next/link';
import { useSelector } from 'react-redux';
import { setPosts, postData } from '../../redux/slices/posts';
import { store, wrapper } from '../../redux/store';

// Components
import Layout from '../../components/Layout';
import Pagination from '../../components/Pagination';
import Post from '../../components/Post';

// styles
import styles from '../../styles/Posts.module.css';

export default function Posts() {
  const posts = useSelector(postData.postsData);
  return (
    <Layout>
      {posts?.length > 0 ? (
        <>
          <Pagination
            data={posts}
            RenderComponent={Post}
            title="Posts"
            pageLimit={5}
            dataLimit={10}
          />
        </>
      ) : (
        <h1>No Posts to display</h1>
      )}
    </Layout>
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
