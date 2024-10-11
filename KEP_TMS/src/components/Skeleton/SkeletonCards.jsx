import { Skeleton } from "primereact/skeleton";
import { Row } from "react-bootstrap";

const SkeletonCards = () => {
  return (
    <>
      <Row className="d-flex flex-wrap p-3 px-4 gap-2">
        <Skeleton height="5rem" width="25rem"></Skeleton>
        <Skeleton height="5rem" width="25rem"></Skeleton>
        <Skeleton height="5rem" width="25rem"></Skeleton>
        <Skeleton height="5rem" width="25rem"></Skeleton>
      </Row>
    </>
  );
};
export default SkeletonCards;
