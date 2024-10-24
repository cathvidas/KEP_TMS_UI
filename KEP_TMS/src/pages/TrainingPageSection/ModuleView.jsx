import { SectionHeading } from "../../components/General/Section";
import proptype from "prop-types"
import moduleHook from "../../hooks/moduleHook";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import SkeletonList from "../../components/Skeleton/SkeletonList";
import { useState } from "react";
import PDFViewer from "../../components/General/PDFViewer";
const ModuleView = ({reqId})=>{
    const {  modules, error, loading} = moduleHook.useModulesByRequestId(reqId)
  const [selected, setSelected]= useState({});
  const [showPDF, setShowPDF]= useState(false);
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
                    <div className="h-100">
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
                            onClick={() =>{
                              setSelected({
                                ...file,
                                url: `http://localhost:5030/api/Attachment/GetModuleFile?attachmentId=${file.id}`,
                              });
                              setShowPDF(true);
                            }}
                          />
                        );
                      })}

                    </div>
                  </AccordionTab>
                );
              })}
            </Accordion>
          </>
        )}
        
        <PDFViewer data={selected} handleShow={showPDF} handleClose={setShowPDF}/>
      </>
    ); 
}
ModuleView.propTypes = {
    reqId: proptype.number,
 
}
export default ModuleView;