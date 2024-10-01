import { Skeleton } from "primereact/skeleton"

const SkeletonHeader = () =>{
    return(
        <div className="w-full md:w-6 p-3 d-flex flex-column justify-content-center align-items-center">
        <Skeleton  className="mb-2"></Skeleton>
        <Skeleton className="mb-2"></Skeleton>
        <Skeleton width="10rem" className="mb-2"></Skeleton>
        <Skeleton width="5rem" className="mb-2"></Skeleton>
        <Skeleton width="10rem" height="3rem"></Skeleton>
        <div></div>
        <Skeleton width="10rem" height="3rem"></Skeleton>
        </div>
        
    )
}
export default SkeletonHeader