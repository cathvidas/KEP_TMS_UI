import { Skeleton } from 'primereact/skeleton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

 const SkeletonDataTable=() =>{
    const items = Array.from({ length: 5 }, (v, i) => i);
const renderHeader=(
    <Skeleton height="2rem" className="mb-2"></Skeleton>
)
    return (
        <div className="">
            <DataTable header={renderHeader} value={items} className="p-datatable-striped">
                <Column field="code" header="" style={{ width: '25%' }} body={<Skeleton />}></Column>
                <Column field="name" header="" style={{ width: '25%' }} body={<Skeleton />}></Column>
                <Column field="category" header="" style={{ width: '25%' }} body={<Skeleton />}></Column>
                <Column field="quantity" header="" style={{ width: '25%' }} body={<Skeleton />}></Column>
            </DataTable>
        </div>
    );
}
export default SkeletonDataTable