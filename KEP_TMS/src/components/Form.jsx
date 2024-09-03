import { Link } from "react-router-dom";

export const FormContainer = () => {
  return (
    <div className="card my-3">
      <div className="card-body">
        <div className="pb-3 border-bottom">
          <div className="d-flex align-items-center gap-2 gap-lg-5 flex-wrap">
            <div
              className="d-flex align-items-center"
              style={{ width: "fit-content" }}
            >
              <span
                className="d-flex justify-content-center align-items-center bs-icon-sm bs-icon-circle me-2 bs-icon text-white"
                style={{
                  background: "rgb(99,59,188)",
                  color: "rgb(99,59,188)",
                }}
              >
                <span>1</span>
              </span>
              <span style={{ fontWeight: "bold" }}>Details</span>
            </div>
            <i className="icon ion-ios-arrow-forward"></i>
            <div
              className="d-flex align-items-center"
              style={{ width: "fit-content" }}
            >
              <span className="d-flex justify-content-center align-items-center bs-icon-sm bs-icon-circle bg-light me-2 bs-icon text-secondary">
                <span>2</span>
              </span>
              <span style={{ fontWeight: "bold" }}>Participants</span>
            </div>
            <i className="icon ion-ios-arrow-forward"></i>
            <div
              className="d-flex align-items-center"
              style={{ width: "fit-content" }}
            >
              <span className="d-flex justify-content-center align-items-center bs-icon-sm bs-icon-circle bg-light text-secondary me-2 bs-icon">
                <span>3</span>
              </span>
              <span style={{ fontWeight: "bold" }}>Details</span>
            </div>
            <i className="icon ion-ios-arrow-forward"></i>
            <div
              className="d-flex align-items-center"
              style={{ width: "fit-content" }}
            >
              <span className="d-flex justify-content-center align-items-center bs-icon-sm bs-icon-circle bg-light text-secondary me-2 bs-icon">
                <span>4</span>
              </span>
              <span style={{ fontWeight: "bold" }}>Details</span>
            </div>
          </div>
        </div>
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
          <button
            className="btn text-white"
            type="button"
            style={{ background: "#633bbc" }}
          >
            Next&nbsp;<i className="icon ion-ios-arrow-forward"></i>
          </button>
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
