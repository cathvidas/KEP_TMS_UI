import { Button } from "primereact/button";

const ToastTemplate = (data)=>{
return<>
<div
  className="p-toast-message-content p-0 flex-grow-1"
  data-pc-section="content"
>
  <i
    className={data?.icon}
    style={{ fontSize: "2rem" }}
  ></i>
  <div className="p-toast-message-text" data-pc-section="text">
    <span className="p-toast-summary" data-pc-section="summary">
      {data?.summary}
    </span>
    <div className="p-toast-detail" data-pc-section="detail">
      {data?.detail}
    </div>
    <div className="mt-2">
      <Button
        type="button"
        size="small"
        className="rounded"
        label={data?.leftButtonLabel}
        outlined={data?.leftButtonOutlined}
        text={data?.leftButtonText}
        severity={data?.leftButtonSeverity}
        icon={data?.leftButtonIcon}
        onClick={data?.leftButtonCommand}
      />
      <Button
        type="button"
        size="small"
        className="ms-2 rounded"
        outlined={data?.rightButtonOutlined}
        text={data?.rightButtonText}
        label={data?.rightButtonLabel}
        severity={data?.rightButtonSeverity}
        icon={data?.rightButtonIcon}
        onClick={data?.rightButtonCommand}
      />
    </div>
  </div>
</div></>
}
export default ToastTemplate;