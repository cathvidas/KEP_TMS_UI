import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import proptype from "prop-types"
import "../../assets/css/customPrimeReact.css"
import { useState } from "react";
import { Tooltip } from "primereact/tooltip";
import TooltipTemplate from "../General/TooltipTemplate";
const MenuContainer = ({itemList, action, label}) =>{ 
    const [visible, setVisible] = useState(true);
    return (
      <>
      <Tooltip target=".custom-target-icon" />
        <div className={`position-sticky top-0 ${visible && "px-3 border-end"} z-1`} style={{ transition: "all .3s",minWidth: !visible ? "0px": "200px",  maxHeight: "calc(100vh - 55px)"}}>
          {visible ? (
            <>
              <div className="flex justify-content-between pt-2 border-bottom">
                <h6 className="m-0 text-muted p-2">{label ?? "Menu"}</h6>   
                <TooltipTemplate title="Minimize Menu" item={ 
                <Button
                  type="button"
                  className=" p-0"
                  icon="pi pi-window-minimize"
                  onClick={() => setVisible(false)}
                  text
                />}/>
              </div>
              <Menu
                model={itemList}
                className="border-0 custom w-100"
                style={{ background: "rgb(251, 253, 252)" }}
              />
              <div className="mx-auto text-center">
              {action}</div>
            </>
          ) : (
            <div className="position-absolute z-1 bg-white mt-1 rounded " 
          >
            <TooltipTemplate title="Expand Menu" item={  <Button
                type="button"
                style={{ width: "unset", lineHeight: "initial" }}
                className="p-0"
                icon="pi pi-window-maximize"
                onClick={() => setVisible(true)}
                text
              />}/>
            
            </div>
          )}
        </div>
      </>
    );
}
MenuContainer.propTypes ={
    itemList: proptype.array.isRequired,
    action: proptype.element,
    label: proptype.string
}
export default MenuContainer;