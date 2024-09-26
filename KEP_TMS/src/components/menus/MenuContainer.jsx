import { Menu } from "primereact/menu";
import { useNavigate, useParams } from "react-router-dom";
import proptype from "prop-types"
const MenuContainer = ({itemList, action}) =>{ 
    return(
    
        <div className="px-3 position-sticky top-0 col-1 d-none d-md-block " style={{height: "fit-content", minWidth: "200px"}}
        >
            <Menu model={itemList} className="border-0" style={{background: "rgb(251, 253, 252)"}} />
            {action}
        </div>
        )
}
MenuContainer.propTypes ={
    itemList: proptype.array.isRequired,
    action: proptype.element
}
export default MenuContainer;