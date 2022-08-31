import Link from 'next/link';
import { useSelector } from 'react-redux';
import { setUsers, usersData } from '../redux/slices/user';
import { store, wrapper } from '../redux/store';
import MainContainer from './components/MainContainer';

export default function Users() {
  const users = useSelector(usersData);
  console.log(users, 'users');
  return (
    <MainContainer>
      <h1>List of users</h1>
      {users?.map((user) => {
        return (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>
              <a>{user.name}</a>
            </Link>
          </li>
        );
      })}
    </MainContainer>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    const userData = await response.json();

    store.dispatch(setUsers(userData));
    return { props: {} };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
});
