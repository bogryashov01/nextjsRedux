import Link from 'next/link';
import { useSelector } from 'react-redux';
import { setPosts, postData } from '../../redux/slices/posts';
import { store, wrapper } from '../../redux/store';

// Components
import Layout from '../../components/Layout';
import Pagination from '../../components/Pagination';
import Post from '../../components/Post';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Posts() {
  const router = useRouter();
  const { query } = router;
  const [currentPage, setCurrentPage] = useState(Number(query.page) || 1);
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
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            router={router}
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
