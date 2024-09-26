import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useNavigate, useParams } from "react-router-dom";
import MenuContainer from "./MenuContainer";

const TraineeMenu = () =>{ 
    const param = useParams();
    const reqId = parseInt(param.int)
    console.log(reqId)
    const navigate = useNavigate()
    const items = [
        {
            label: 'Menu',
            items: [
                {
                    label: 'Overview',
                    icon: 'pi pi-info-circle',
                    command: () => navigate(`/KEP_TMS/Training/${reqId}`),
                    
                },
                {
                    label: 'Modules',
                    icon: 'pi pi-folder',
                    command: () => navigate(`/KEP_TMS/Training/${reqId}/Modules`),
                },
                {
                    label: 'Exam',
                    icon: 'pi pi-list-check',
                    command: () => navigate(`/KEP_TMS/Training/${reqId}/Exams`),
                },
                {
                    label: 'Participants',
                    icon: 'pi pi-users',
                    command: () => navigate(`/KEP_TMS/Training/${reqId}/Exams`),
                },
                {
                    label: 'Reports',
                    icon: 'pi pi-address-book',
                    command: () => navigate(`/KEP_TMS/Training/${reqId}/Exams`),
                },
                {
                    label: 'Summary',
                    icon: 'pi pi-chart-bar',
                    command: () => navigate(`/KEP_TMS/Training/${reqId}/Exams`),
                },
                {
                    label: 'Pendings',
                    icon: 'pi pi-bookmark',
                    command: () => navigate(`/KEP_TMS/Training/${reqId}/Exams`),
                }
            ]
        },
    ];
    return(
        <>
        <MenuContainer itemList={items}/>
        </>
        )
}
export default TraineeMenu;