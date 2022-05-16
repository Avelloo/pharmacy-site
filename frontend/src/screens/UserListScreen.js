import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function UserListScreen() {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);
  return (
    <div>
      <h1>Пользователи</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Email</th>
              <th>Продавец?</th>
              <th>Админ?</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isSeller ? 'Да' : ' Нет'}</td>
                <td>{user.isAdmin ? 'Да' : 'Нет'}</td>
                <td>
                  <button>Редактировать</button>
                  <button>Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}