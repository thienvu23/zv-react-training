import "./Profile.css";
import { useSelector } from "react-redux";

import { UserDetail } from "../../components/UserDetail";

function Profile() {
  const userProfile = useSelector((state) => state.auth.userInfo);

  return (
    <div className="default-page-main Profile">
      <UserDetail data={userProfile} />
    </div>
  );
}

export default Profile;
