import { SectionHeading } from "../../components/General/Section";
import proptype from "prop-types";
import moduleHook from "../../hooks/moduleHook";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import SkeletonList from "../../components/Skeleton/SkeletonList";
import { useEffect, useState } from "react";
import PDFViewer from "../../components/General/PDFViewer";
import { CompareDateTimeWithToday } from "../../utils/datetime/dateComparison";
import ModuleSection from "../RequestPageSection/ModuleSection";
const ModuleView = ({ reqData, isEditor, isTrainee }) => {
  const [filteredModules, setFilteredModules] = useState([]);
  const { modules, error, loading } = moduleHook.useModulesByRequestId(reqData?.id);
  const [selected, setSelected] = useState({});
  const [showPDF, setShowPDF] = useState(false);
  useEffect(() => {
    const filteredData = modules?.filter(
      (item) =>
        (item?.availableAt === null && item?.unavailableAt === null) ||
        (CompareDateTimeWithToday(item?.availableAt)?.isPast &&
          CompareDateTimeWithToday(item?.unavailableAt)?.isFuture)
    );
    setFilteredModules(filteredData);
  }, [modules]);
  return (
    <>
      {isEditor ? (
        <ModuleSection data={reqData}/>
      ) : isTrainee ? (
        <>
          {loading ? (
            <SkeletonList />
          ) : error ? (
            <p>Error while processing your request</p>
          ) : filteredModules?.length > 0 ? (
            <>
              <SectionHeading
                title="Modules"
                icon={<i className="pi pi-folder"></i>}
              />
              <Accordion activeIndex={0}>
                {filteredModules?.map((item, index) => (
                  <AccordionTab
                    key={`module${index}`}
                    header={item.name}
                    className="custom-link"
                  >
                    <div className="h-100">
                      <div
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></div>
                      {/* <p className="m-0">{item.description}</p> */}
                      {item?.attachments?.map((file) => {
                        return (
                          <Button
                            key={`file${file.id}`}
                            type="button"
                            icon="pi pi-link"
                            text
                            label={file.fileName}
                            className="rounded py-1"
                            onClick={() => {
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
                ))}
              </Accordion>
            </>
          ) : (
            <div className="p-3">
              <p>No modules available as of the moment.</p>
            </div>
          )}
        </>
      ) : <></>}

      <PDFViewer
        data={selected}
        handleShow={showPDF}
        handleClose={setShowPDF}
      />
    </>
  );
};
ModuleView.propTypes = {
  reqData: proptype.object,
  isEditor: proptype.func,
  isTrainee: proptype.func,
};
export default ModuleView;
