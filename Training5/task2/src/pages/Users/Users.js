import "./Users.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";

import { UserDetail } from "../../components/UserDetail";

import { getUsers } from "../../redux/actions/auth";
import { PATH_CHILD } from "../../routes/main";
import { toast } from "react-toastify";

function Users() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id: idParams } = useParams();

  const loadingAuth = useSelector((state) => state.auth.loading);

  const [users, setUsers] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const userDetailInfo = users?.entity?.[idParams];

  React.useEffect(() => {
    if (idParams && !userDetailInfo && !loading) {
      toast("User not found");
      history.push(PATH_CHILD.users);
    }
  }, [userDetailInfo, idParams, loading]);

  React.useEffect(() => {
    dispatch(
      getUsers({
        resolve: (users) => {
          setUsers(users);
          setLoading(false);
        },
        reject: () => {
          setLoading(false);
        },
      })
    );
  }, []);

  return (
    <div className="default-page-main Users">
      {users.ids && (
        <div className="list-users">
          {users.ids.map((id) => {
            const userData = users?.entity?.[id];
            const isActive = idParams === id;
            return (
              <React.Fragment key={id}>
                <NavLink
                  to={`${PATH_CHILD.users}/${id}`}
                  className={`row-flex user-item`}
                  activeStyle={{ fontWeight: 600 }}
                >
                  <span className="user-name">{userData.fullName}</span>
                  {isActive && <div className="triangle-left" />}
                </NavLink>
                <div className="white-space" />
              </React.Fragment>
            );
          })}
        </div>
      )}
      <div className="detail-user-container">
        {!!userDetailInfo ? (
          <UserDetail data={users?.entity?.[idParams]} />
        ) : (
          <span>Please choose a user to view detail</span>
        )}
      </div>
      {loading && !loadingAuth && (
        <div className="loading-view">
          <div className="loader-medium" />
        </div>
      )}
    </div>
  );
}

export default Users;
