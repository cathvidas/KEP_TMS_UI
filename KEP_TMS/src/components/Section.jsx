import proptype from "prop-types";
import React from "react";
export const SectionTitle = ({ title, ViewAll }) => {
  return (
    <div className="d-flex justify-content-between">
      <h6>{title}</h6>
      {ViewAll && <p>{ViewAll}</p>}
    </div>
  );
};

SectionTitle.propTypes = {
  title: proptype.string.isRequired,
  ViewAll: proptype.string,
}

export const SectionBanner =({title, subtitle, actionComponents})=>{
  return(<>
  
  <div className="p-4 rounded" style={{background: 'linear-gradient(rgba(91,228,155,0.2) 0%, rgba(0,167,111,0.2) 98%)'}}>
            <h3 className="fw-bold" style={{color: 'rgb(0,75,80)'}}>{title}</h3>
            <p className="m-0">{subtitle}</p>
            {actionComponents && actionComponents.map((actionItem)=>(
              React.cloneElement(actionItem)
            ))}
        </div>
  </>)
}
SectionBanner.propTypes={
  title: proptype.string.isRequired,
  subtitle: proptype.string,
  actionComponents: proptype.array
}
