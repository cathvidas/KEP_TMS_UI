import { icon } from "@fortawesome/fontawesome-svg-core";
import Layout from "../components/General/Layout";
import MenuContainer from "../components/menus/MenuContainer";
import MenuItemTemplate from "../components/General/MenuItemTemplate";
import { UserList } from "../components/List/UserList";
import AllUserPageSection from "./UserPageSection/AllUserPageSection";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserDetailView from "./UserPageSection/UserDetailView";

const UserPage = ()=>{
    const {page, id} = useParams();
    const navigate= useNavigate();
    const [currentContent, setCurrentContent] = useState(0)
    const items = [{
        label: "Users",
        items:[
            {label: "View Users", icon: "pi pi-eye", template: MenuItemTemplate, command: ()=>navigate("/KEP_TMS/Users")},
            {label: "Trainee", icon: "pi pi-users", template: MenuItemTemplate, command: ()=>navigate("/KEP_TMS/Users/Trainee") },
            {label: "Approver", icon: "pi pi-users", template: MenuItemTemplate, command: ()=>navigate("/KEP_TMS/Users/Approver")},
            {label: "Facilatator", icon: "pi pi-users", template: MenuItemTemplate, command: ()=>navigate("/KEP_TMS/Users/Facilitator")},
            {label: "Admin", icon: "pi pi-users", template: MenuItemTemplate, command: ()=>navigate("/KEP_TMS/Users/Admin")}
        ]
    }]
    const pageContent = [
        <UserDetailView key={0} id={id}/>,
        <AllUserPageSection key={1}/>,
        <AllUserPageSection key={2} userType="Trainee"/>,
        <AllUserPageSection key={3} userType="Approver"/>,
        <AllUserPageSection key={4} userType="Facilitator"/>,
        <AllUserPageSection key={5} userType="Admin"/>,
    ]
    useEffect(() => {
      if (page && id) {
        setCurrentContent(0);
      } else if (page === "Trainee") {
        setCurrentContent(2);
      } else if (page === "Approver") {
        setCurrentContent(3);
      } else if (page === "Facilitator") {
        setCurrentContent(4);
      } else if (page === "Admin") {
        setCurrentContent(5);
      } else {
        setCurrentContent(1);
      }
    }, [page, id]);
      console.log(page, id)
    const Content = ()=>{
        return <>
        <div className={`d-flex g-0`}>
          <MenuContainer itemList={items} />
          <div
            className={`border-start p-3 pb-5 flex-grow-1`}
            style={{ minHeight: "calc(100vh - 50px)" }}
          >
            {pageContent[currentContent]}
          </div>
        </div>
        </>
    }
    return(
        <Layout header={{title: "Users", icon: <i className="pi pi-users"></i>}} BodyComponent={Content}/>
    )
}
export default UserPage;