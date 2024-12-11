import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormFieldItem } from "./FormElements";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";
import proptype from "prop-types";
import { useEffect, useState } from "react";
import { SectionHeading } from "../General/Section";
import Select from "react-select";
import { TrainingType } from "../../api/constants";
import externalFacilitatorHook from "../../hooks/externalFacilitatorHook";
import providerHook from "../../hooks/providerHook";

const TrainingCostForm = ({
  formData,
  handleResponse,
  error,
}) => {
  const [data, setFormData] = useState(formData);
  const [cost, setCost] = useState(data.trainingFee);
  const [totalCost, setTotalCost] = useState(0);
  const [providers, setProviders] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [trainerOptions, setTrainerOptions] = useState([]);
  const [withEarlyRate, setWithEarlyRate] = useState(false);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    size: 10,
    value: "",
  });
  const [providerConfig, setProviderConfig] = useState({
    page: 1,
    size: 10,
    value: "",
  });
  const externalFacilitator =
    externalFacilitatorHook.usePagedExternalFacilitator(
      pageConfig.page,
      pageConfig.size,
      pageConfig.value
    );
    const providersData =
      providerHook.usePagedProvider(
        providerConfig.page,
        providerConfig.size,
        providerConfig.value
      );
  useEffect(() => {
    if (externalFacilitator?.data?.results) {
      const newTrainerOptions = externalFacilitator.data.results.map(
        (item) => ({
          value: item.id,
          label: item.name,
        })
      );

      // Prevent duplicates in the trainer options list
      setTrainerOptions((prev) => {
        const uniqueOptions = [
          ...prev,
          ...newTrainerOptions.filter(
            (newOption) =>
              !prev.some((option) => option.value === newOption.value)
          ),
        ];
        return uniqueOptions;
      });
    }
  }, [externalFacilitator?.data]);
  useEffect(() => {
  setProviders(providersData?.data?.results?.filter(item=> item?.status?.name === "Active")?.map(({ id, name }) => ({
    label: name,
    value: id,
  })))
  }, [providersData?.data?.results]);
  useEffect(() => {
    if (handleResponse != null) {
      handleResponse(data);
    }
  }, [data]);
  useEffect(() => {
    if (withEarlyRate) {
      const date = new Date();
      const cutOffDate = date.toLocaleDateString("en-CA");
      setFormData((prev) => ({ ...prev, cutOffDate: cutOffDate }));
    } else {
      setFormData((prev) => ({ ...prev, cutOffDate: "", discountedRate: 0 }));
    }
  }, [withEarlyRate]);

  useEffect(() => {
    setTotalCost(data.trainingParticipants?.length * cost);
    setFormData((prev) => ({
      ...prev,
      trainingFee: cost,
      totalTrainingFee: totalCost,
    }));
  }, [cost, totalCost]);

  useEffect(() => {
    if (formData.discountedRate > 0 || formData.cutOffDate != null) {
      setWithEarlyRate(true);
    } else {
      setWithEarlyRate(false);
    }
    if (formData?.trainingType?.id === TrainingType.EXTERNAL) {
      setTrainers(formData.trainingFacilitators);
    }
    // console.log(formData)
  }, [formData]);
  useEffect(() => {
    if (trainers) {
      // setFormData(prev=>({...prev, trainingFacilitators: mappedFacilitator}));
      setFormData((prev) => ({ ...prev, trainingFacilitators: trainers }));
    }
  }, [trainers]);
  return (
    <>
      <SectionHeading
        title="Training Provider"
        icon={<FontAwesomeIcon icon={faUsers} />}
      />
      <FormFieldItem
        label={"Training Provider"}
        col="col-12"
        error={error?.provider}
        required
        FieldComponent={
          <Select
            isLoading={providersData?.loading}
            value={
              data?.trainingProvider?.id
                ? {
                    label: data?.trainingProvider?.name,
                    value: data?.trainingProvider?.id,
                  }
                : ""
            }
            onMenuScrollToBottom={() =>
              setProviderConfig((prev) => ({ ...prev, size: prev.size + 10 }))
            }
            onInputChange={(e) =>
              setProviderConfig((prev) => ({ ...prev, value: e }))
            }
            options={providers}
            onChange={(e) =>
              setFormData((obj) => ({
                ...obj,
                trainingProvider: { id: e.value, name: e.label },
              }))
            }
          />
        }
      />
      <FormFieldItem
        label={"Trainer"}
        col="col-12"
        error={error?.facilitators}
        required
        FieldComponent={
          <Select
            onInputChange={(e) =>
              setPageConfig((prev) => ({ ...prev, value: e }))
            }
            isLoading={externalFacilitator?.loading}
            onMenuScrollToBottom={() =>
              setPageConfig((prev) => ({ ...prev, size: prev.size + 10 }))
            }
            isMulti
            value={data?.trainingFacilitators?.map(({ faciDetail }) => ({
              label: faciDetail?.name,
              value: faciDetail?.id,
            }))}
            options={trainerOptions}
            onChange={(e) => {
              setFormData((obj) => ({
                ...obj,
                trainingFacilitators: e?.map(item=>({
                  faciDetail: {
                    id: item.value,
                    name: item.label,
                  }
                }))
              }));
            }}
          />
        }
      />
      <div className="mt-4"></div>
      <SectionHeading
        title="Training Cost"
        icon={<FontAwesomeIcon icon={faUsers} />}
      />
      <Row>
        <Col className="col-12 col-md-4">
          <FormFieldItem
            label="Training Fee"
            subLabel={"(per pax)"}
            col={"col-md-10"}
            FieldComponent={
              <input
                type="number"
                value={data.trainingFee}
                min="0"
                className="form-control"
                onChange={(e) => setCost(parseFloat(e.target.value))}
              />
            }
          />
          <FormFieldItem
            label="Total Training Fee"
            subLabel={`(${formData?.trainingParticipants?.length} participants)`}
            col={"col-md-10"}
            FieldComponent={
              <input
                type="number"
                value={data.totalTrainingFee}
                min="0"
                className="form-control"
                readOnly
              />
            }
          />
        </Col>
        <Col className="col-lg-6">
          <FormFieldItem
            label={"With early bird rate"}
            FieldComponent={
              <div className="d-flex gap-5">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    checked={withEarlyRate}
                    onChange={() => setWithEarlyRate(true)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Yes
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    checked={!withEarlyRate}
                    onChange={() => setWithEarlyRate(false)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    No
                  </label>
                </div>
              </div>
            }
          />
          {withEarlyRate && (
            <Row>
              <FormFieldItem
                label={"Discounted rate"}
                col={"col-6"}
                FieldComponent={
                  <input
                    className="form-control"
                    type="number"
                    min="0"
                    value={data.discountedRate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        discountedRate: parseFloat(e.target.value),
                      }))
                    }
                  />
                }
              />
              <FormFieldItem
                label={"cut-off date"}
                col={"col-6"}
                FieldComponent={
                  <input
                    className="form-control"
                    type="date"
                    //defaultValue={"2023-12-12"}
                    value={data.cutOffDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        cutOffDate: e.target.value,
                      }))
                    }
                  />
                }
              />
            </Row>
          )}
        </Col>
      </Row>
    </>
  );
};
TrainingCostForm.propTypes = {
  formData: proptype.object.isRequired,
  handleResponse: proptype.func,
  providersData: proptype.object,
  error: proptype.object,
};
export default TrainingCostForm;
