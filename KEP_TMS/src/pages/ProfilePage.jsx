import Layout from "../components/General/Layout";
import { SessionGetEmployeeId } from "../services/sessions"
import UserDetailView from "./UserPageSection/UserDetailView"

const ProfilePage = () => {
  return (
    <>
       <Layout
          navReference="Profile"
          header={{ title: "Users", icon: <i className="pi pi-users"></i>, hide:true }}
          BodyComponent={()=>  <div className="p-3">
          <UserDetailView
            key={0}
            id={SessionGetEmployeeId()}
          /></div> }
        />
   
    </>
  );
};
export default ProfilePage;