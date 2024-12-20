
import { Skeleton } from 'primereact/skeleton';

 const SkeletonBanner=() =>{

    return (
      <>
        <div className="w-full md:w-6 p-3">
          <Skeleton height="2rem" className="mb-2"></Skeleton>
          <Skeleton className="mb-2"></Skeleton>
          <Skeleton width="10rem" className="mb-2"></Skeleton>
          <Skeleton width="5rem" className="mb-2"></Skeleton>
          <div className='flex'>
          {/* <Skeleton width="10rem" height="" className='mb-2'></Skeleton> */}
          <Skeleton width="10rem" height="3rem" ></Skeleton>
          <Skeleton width="10rem" height="3rem" ></Skeleton></div>
        </div>
      </>
    );
}
export default SkeletonBanner