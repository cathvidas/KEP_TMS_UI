import RequestModal from "./RequestType";
import Sidebar from "./Sidebar";
import proptype from 'prop-types'
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
RenderLayout.propTypes = {
  ActionComponent: proptype.func
}
export default RenderLayout;
