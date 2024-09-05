import proptype from "prop-types";
import { Link } from "react-router-dom";
export const SectionTitle = ({ title, Action }) => {
  return (
    <div className="d-flex py-2 justify-content-between">
      <h6>{title}</h6>
      {Action && <Link className="text-muted text-decoration-none" to={Action.Link}>{Action.Text}</Link>}
    </div>
  );
};

SectionTitle.propTypes = {
  title: proptype.string.isRequired,
  Action: proptype.object,
}

export const SectionBanner =({title, subtitle, ActionComponents})=>{
  return(<>
  
  <div className="p-4 rounded" style={{background: 'linear-gradient(rgba(91,228,155,0.2) 0%, rgba(0,167,111,0.2) 98%)'}}>
            <h3 className="fw-bold" style={{color: 'rgb(0,75,80)'}}>{title}</h3>
            <p className="m-0">{subtitle}</p>
            {ActionComponents && <div className="mt-2" ><ActionComponents/></div>}
        </div>
  </>)
}
SectionBanner.propTypes={
  title: proptype.string.isRequired,
  subtitle: proptype.string,
  ActionComponents: proptype.func
}
