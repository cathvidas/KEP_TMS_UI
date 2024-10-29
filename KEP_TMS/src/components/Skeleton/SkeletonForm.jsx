import { Skeleton } from 'primereact/skeleton';
const SkeletonForm = () => {
  return (
    <>
      <div className="border-round border-1 surface-border p-4 surface-card">
        <div className="flex flex-column  mb-3">
            <Skeleton width="20rem" className="mb-2"></Skeleton>
            <Skeleton width="10rem" className="mb-2"></Skeleton>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
        </div>
        <Skeleton width="100%" height="150px" className="mb-3"></Skeleton>
        <Skeleton width="100%" height="150px"></Skeleton>
      </div>
    </>
  );
};
export default SkeletonForm;