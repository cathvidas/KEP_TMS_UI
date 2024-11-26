import { Button } from "primereact/button";
import { SectionHeading } from "../../components/General/Section";
import { FormFieldItem } from "../../components/trainingRequestFormComponents/FormElements";
import { actionFailed, actionSuccessful, confirmAction } from "../../services/sweetalert";
import handleResponseAsync from "../../services/handleResponseAsync";
import emailService from "../../services/emailService";
import { useState } from "react";

const EmailIntervalSetting = () => {
    const [reminderInterval, setReminderInterval] = useState(1); // default to 1 day
    const handleSubmit = () => {
        confirmAction({
            title: "Are you sure?",
            text: "This action cannot be undone.",
            onConfirm: () => handleResponseAsync(
                ()=>emailService.updateEmailReminderInterval(reminderInterval),
                ()=>actionSuccessful("Success", "Email reminder interval updated successfully"),
                (error)=>actionFailed("Error", error.message)
            )
        })
    }
  return<>
  <div className="email-interval-setting">
    <SectionHeading title="Email Interval Setting" icon={<p className="pi pi-gear"></p>}/>
    <FormFieldItem label={"Set Reminder Interval"}
    subLabel="(in hours)"
    col={"col-lg-4"}
    FieldComponent={<input type="text" placeholder="Set Interval" className="form-control"/>}
    />
    <Button type="button" label="Update" className="theme-bg rounded" onClick={handleSubmit}/>
  </div>

  </>
}
export default EmailIntervalSetting;