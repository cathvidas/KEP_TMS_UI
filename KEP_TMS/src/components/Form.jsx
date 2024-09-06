import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import proptype from "prop-types";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { ActionButton } from "./Button";
export const FormContainer = () => {
  return (
    <div className="card my-3">
      <div className="card-body">
        <FormHeader />
        <div className="row my-3">
          <div className="col col-md-7 border-end">
            <div className="row row-cols-1 gy-3">
              <div className="col">
                <div className="form-group">
                  <label className="form-label fw-semibold">Program</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Program"
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label className="form-label fw-semibold">Category</label>
                  <select className="form-select">
                    <optgroup label="This is a group">
                      <option value="12" selected="">
                        This is item 1
                      </option>
                      <option value="13">This is item 2</option>
                      <option value="14">This is item 3</option>
                    </optgroup>
                  </select>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label className="form-label fw-semibold">Objective</label>
                  <textarea
                    className="form-control"
                    placeholder="Training objective"
                  ></textarea>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label className="form-label fw-semibold">Provider</label>
                  <select className="form-select">
                    <optgroup label="This is a group">
                      <option value="12" selected="">
                        This is item 1
                      </option>
                      <option value="13">This is item 2</option>
                      <option value="14">This is item 3</option>
                    </optgroup>
                  </select>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label className="form-label fw-semibold">Venue</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Training Venue"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <h6 className="text-uppercase">Training dates</h6>
            <div className="row g-2">
              <div className="col">
                <div className="form-group">
                  <label className="form-label fw-semibold">Start Date</label>
                  <input className="form-control" type="date" />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label className="form-label fw-semibold">End Date</label>
                  <input className="form-control" type="date" />
                </div>
              </div>
              <div className="col col-12 d-flex flex-column gap-2 mt-5">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="m-0">Schedules</h6>
                  <button
                    className="btn btn-primary"
                    type="button"
                    style={{
                      color: "rgb(101,85,143)",
                      background: "rgba(101,85,143,0.12)",
                      borderStyle: "none",
                    }}
                  >
                    <i className="icon ion-plus"></i>&nbsp;Add item
                  </button>
                </div>
                <div className="row">
                  <div className="col m-0 col-md-3">
                    <label className="col-form-label fw-semibold">Date</label>
                  </div>
                  <div className="col col-md-9">
                    <input className="form-control" type="date" />
                  </div>
                </div>
                <div className="row">
                  <div className="col m-0 col-md-3">
                    <label className="col-form-label fw-semibold">
                      Start Time
                    </label>
                  </div>
                  <div className="col col-md-9">
                    <input className="form-control" type="time" />
                  </div>
                </div>
                <div className="row">
                  <div className="col m-0 col-md-3">
                    <label className="col-form-label fw-semibold">
                      End Time
                    </label>
                  </div>
                  <div className="col col-md-9">
                    <input className="form-control" type="time" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-shrink-0 justify-content-end">
          <ActionButton
            title="Next"
            actionLink="/KEP_TMS/Newrequest"
            variant={{ brand: "next-btn", size: "btn-sm" }}
          />
        </div>
        <div className="modal fade" role="dialog" tabIndex="-1" id="modal-1">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Modal Title</h4>
                <button
                  className="btn-close"
                  type="button"
                  aria-label="Close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <p>The content of your modal.</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-light"
                  type="button"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button className="btn btn-primary" type="button">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const FormHeader = () => {
  return (
    <>
      <div className="pb-3 border-bottom">
        <div className="d-flex align-items-center gap-2 gap-lg-5 flex-wrap">
          <FormStep step={2} title="Details" state="success" />
          <FontAwesomeIcon icon={faGreaterThan} />
          <FormStep step={2} title="Details" state="active" />
          <FontAwesomeIcon icon={faGreaterThan} />
          <FormStep step={3} title="Details" />
          <FontAwesomeIcon icon={faGreaterThan} />
          <FormStep step={4} title="Details" />
        </div>
      </div>
    </>
  );
};
export const FormStep = ({ step, title, state }) => {
  var style =
    state == "success"
      ? "formStep-success"
      : state == "active"
      ? "formStep-active"
      : "bg-light text-secondary";
  return (
    <>
      <div
        className="d-flex align-items-center"
        style={{ width: "fit-content" }}
      >
        <span
          className={`d-flex justify-content-center me-2  rounded-circle align-items-center p-2 bs-icon-sm bs-icon-circle bs-icon ${style}`}
        >
          <span style={{ lineHeight: "0.7rem" }}>{step}</span>
        </span>
        <span className="fw-bold">{title}</span>
      </div>
    </>
  );
};
FormStep.propTypes = {
  step: proptype.number,
  title: proptype.string.isRequired,
  state: proptype.string,
};
