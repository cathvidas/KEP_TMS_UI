import { Button } from "primereact/button";
import { SectionHeading } from "../../components/General/Section";
import { FormFieldItem } from "../../components/trainingRequestFormComponents/FormElements";
import { actionFailed, actionSuccessful, confirmAction } from "../../services/sweetalert";
import handleResponseAsync from "../../services/handleResponseAsync";
import emailService from "../../services/emailService";
import { useEffect, useState } from "react";

const EmailIntervalSetting = () => {
  // const
  const [trigger, setTrigger] = useState(0);
  const [defaultInterval, setDefaultInterval] = useState();
    const [reminderInterval, setReminderInterval] = useState(); // default to 1 day
    useEffect(() => {
     const  fetchData = async ()=>{
      handleResponseAsync(
        ()=>emailService.getEmailReminderInterval(),
        (response)=>{setReminderInterval(response?.reminderTimeInterval);
          setDefaultInterval(response);
        },
        ()=>{""}
      )}
      fetchData();
    },[trigger])
    const handleSubmit = () => {
        confirmAction({
            title: "Are you sure?",
            text: "This action cannot be undone.",
            onConfirm: () => handleResponseAsync(
                ()=>emailService.updateEmailReminderInterval({reminderTimeInterval: reminderInterval}),
                ()=>{actionSuccessful("Success", "Email reminder interval updated successfully");
                  setTrigger(prev=>prev+1);
                },
                (error)=>actionFailed("Error", error.message)
            )
        })
    }
  return (
    <>
      <div className="email-interval-setting">
        <SectionHeading
          title="Email Interval Setting"
          icon={<p className="pi pi-gear"></p>}
        />
        <FormFieldItem
          label={"Set Interval"}
          subLabel="(in hours)"
          col={"col-lg-4"}
          FieldComponent={
            <input
              type="number"
              placeholder="Set Interval"
              className="form-control"
              value={reminderInterval}
              onChange={(e) =>
                setReminderInterval(parseInt(e.target.value))
              }
            />
          }
        />
        <Button
          type="button"
          label="Update"
          className="theme-bg rounded"
          onClick={handleSubmit}
          disabled={reminderInterval <= 0  || reminderInterval == defaultInterval?.reminderTimeInterval}
        />
      </div>
    </>
  );
}
export default EmailIntervalSetting;