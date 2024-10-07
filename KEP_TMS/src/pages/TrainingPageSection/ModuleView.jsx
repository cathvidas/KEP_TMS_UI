import { Col, Row } from "react-bootstrap";
import { SectionHeading } from "../../components/General/Section";
import proptype from "prop-types"
import ModuleItem from "../../components/TrainingPageComponents/ModuleItem";
import moduleHook from "../../hooks/moduleHook";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import SkeletonList from "../../components/Skeleton/SkeletonList";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const ModuleView = ({reqId})=>{
    const [fileSrc, setFileSrc] = useState(null)
    const navigate = useNavigate();
    const {  modules, error, loading} = moduleHook.useModulesByRequestId(reqId)
    console.log(modules)
    const getFileAttachment = (id)=>{
setFileSrc(`http://localhost:5030/api/Attachment/GetModuleFile?attachmentId=${id}`)
    }
    return (
      <>
        {loading ? (
          <SkeletonList />
        ) : (
          <>
            <SectionHeading
              title="Modules"
              icon={<i className="pi pi-folder"></i>}
            />
            <Accordion activeIndex={0}>
              {modules?.map((item, index) => {
                return (
                  <AccordionTab key={`module${index}`} header={item.name}>
                    <div className="">
                      <p className="m-0">{item.description}</p>
                      {item?.attachments?.map((file) => {
                        return (
                          <Button
                            key={`file${file.id}`}
                            type="button"
                            icon="pi pi-link"
                            text
                            label={file.fileName}
                            className="rounded py-1"
                            onClick={()=>getFileAttachment(file.id)}
                          />
                        );
                      })}

                      <Button
                        type="button"
                        icon="pi pi-link"
                        text
                        label="FileName"
                        className="rounded py-1"
                      />
                    </div>
                  </AccordionTab>
                );
              })}
            </Accordion>
          </>
        )}
        <div>
          <iframe
            src={fileSrc}
            style={{
                frameBorder:"0",
                scrolling:"auto",
                height:"100vh",
                width:"100%"}}
          ></iframe>
        </div>
      </>
    ); 
}
ModuleView.propTypes = {
    reqId: proptype.number,
 
}
export default ModuleView;