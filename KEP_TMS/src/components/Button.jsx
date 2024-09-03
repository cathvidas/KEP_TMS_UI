import proptype from 'prop-types'
import { Link } from 'react-router-dom'
export const ActionButton =({title, actionLink, toggleItem, targetItem })=>{
    return(<>    
    <Link
        className="btn brand-btn btn-lg me-2"
        role="button"
        to={actionLink? actionLink : "#"}
        style={{background: '#00a76f;border-color: #00a76f'}}
        data-bs-toggle={toggleItem? toggleItem: ""}
        data-bs-target={targetItem? `#${targetItem}`: ""}
      >{title}
      </Link>
    </>)

}
ActionButton.propTypes={
title: proptype.string.isRequired,
actionLink: proptype.string,
toggleItem: proptype.string,
targetItem: proptype.string
}