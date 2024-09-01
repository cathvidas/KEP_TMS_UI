import RequestModal from "./RequestType";
import Sidebar from "./Sidebar";

const RenderLayout = ({ ActionComponent }) => {
  return (
    <>
      <Sidebar />
      <div
        className="flex-grow-1 px-3 px-md-4"
        style={{ marginLeft: "4.5rem" }}
      >
        {ActionComponent && <ActionComponent />}
      </div>
      <RequestModal />
    </>
  );
};
export default RenderLayout;
