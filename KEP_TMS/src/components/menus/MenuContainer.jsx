import { Menu } from "primereact/menu";
import proptype from "prop-types"
const MenuContainer = ({itemList, action, isPublished}) =>{ 
    return(
    
        <div className="px-3 position-sticky top-0 d-none d-md-block " style={{height: "fit-content", minWidth: "200px"}}
        >
            <Menu model={itemList} className="border-0" style={{background: "rgb(251, 253, 252)"}} />
            {!isPublished && action}
        </div>
        )
}
MenuContainer.propTypes ={
    itemList: proptype.array.isRequired,
    action: proptype.element,
    isPublished: proptype.bool
}
export default MenuContainer;