
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { MeterGroup } from 'primereact/metergroup';
import { Col, Row } from 'react-bootstrap';
const ScalarMeasurement=() =>{
    const meter = (props, attr) => <span {...attr} key={props.index} style={{ background: `linear-gradient(to right, ${props.color1}, ${props.color2})`, width: props.percentage + '%' }} />;

    const labelList = ({ values }) => (
        <Row className="">
            {values.map((item, index) => (
              <Col  key={index}>
                <Card className="shadow-sm">
                    <div className="flex justify-content-between gap-5">
                        <div className="flex flex-column gap-1">
                            <span className="text-secondary text-sm">{item.label}</span>
                            <span className="font-bold text-lg">{item.value}%</span>
                        </div>
                        <span className="p-3 ratio ratio-1x1 d-flex justify-content-center align-items-center text-center rounded-circle" style={{ backgroundColor: item.color1, color: '#ffffff' , width: "4rem"}}>
                            <i className={item.icon}  style={{top: "unset", left: "unset", fontSize: "2rem", height: "unset"}}/>
                        </span>
                    </div>
                </Card></Col>
            ))}
        </Row>
    );

    const start = ({ totalPercent }) => (
        <div className="flex justify-content-between mt-3 mb-2 relative">
            <span>Storage</span>
            <span style={{ width: totalPercent + '%' }} className="absolute text-right">
                {totalPercent}%
            </span>
            <span className="font-medium">1TB</span>
        </div>
    );

    const end = (
        <div className="flex justify-content-between mt-3">
            <Button label="Manage Storage" outlined size="small" />
            <Button label="Update Plan" size="small" />
        </div>
    );

    const values = [
        { label: 'Apps', color1: '#34d399', color2: '#fbbf24', value: 25, icon: 'pi pi-table' },
        { label: 'Messages', color1: '#fbbf24', color2: '#60a5fa', value: 15, icon: 'pi pi-inbox' },
        { label: 'Media', color1: '#60a5fa', color2: '#c084fc', value: 20, icon: 'pi pi-image' },
        { label: 'System', color1: '#c084fc', color2: '#c084fc', value: 10, icon: 'pi pi-cog', meterTemplate: meter }
    ];

    return (
        <div className="p-3 flex justify-content-center w-100">
            <MeterGroup labelPosition="start" className='w-100' values={values} start={start} end={end} meter={meter} labelList={labelList} />
        </div>
    )
}

export default ScalarMeasurement;

        