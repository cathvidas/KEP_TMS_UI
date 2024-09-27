import { useNavigate } from "react-router-dom";
import MenuContainer from "./MenuContainer";
import proptype from "prop-types"
const TraineeMenu = ({reqId}) =>{ 
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
                    command: () => navigate(`/KEP_TMS/Training/${reqId}/Participants`),
                },
                {
                    label: 'Reports',
                    icon: 'pi pi-address-book',
                    command: () => navigate(`/KEP_TMS/Training/${reqId}/Report`),
                },
                {
                    label: 'Summary',
                    icon: 'pi pi-chart-bar',
                    command: () => navigate(`/KEP_TMS/Training/${reqId}/Exams`),
                },
                {
                    label: 'Pendings',
                    icon: 'pi pi-bookmark',
                    command: () => navigate(`/KEP_TMS/Training/${reqId}/Pendings`),
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
TraineeMenu.propTypes = {
    reqId: proptype.number.isRequired
}
export default TraineeMenu;