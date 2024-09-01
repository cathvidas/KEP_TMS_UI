import { Button, Navbar } from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {faPlus} from '@fortawesome/free-solid-svg-icons'
 const TMS_Header = ({ title }) => {
  return (
    <Navbar className="navbar-expand-md d-flex">
      <a className="navbar-brand d-flex align-items-center" href="#">
        <span
          className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center bs-icon"
          style={{ color: 'rgb(0, 167, 111)', background: 'rgba(13, 110, 253, 0)' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="bi bi-house-door"
          >
            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"></path>
          </svg>
        </span>
        <span style={{ color: "#00a76f" }}>{title}</span>
      </a>
      <button className="navbar-toggler" data-bs-toggle="collapse">
        <span className="visually-hidden">Toggle navigation</span>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="navbar-collapse justify-content-end gap-3 align-items-center"
        id="navcol-2"
      >
        <ul className="nav nav-tabs gap-3 border-0">
          <li className="nav-item"></li>
          <li className="nav-item">
            <span className="position-relative">
              <input
                type="search"
                className="form-control pe-4"
                placeholder="Search.."
              />
              <span className="position-absolute top-50 end-0 translate-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-search"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
                </svg>
              </span>
            </span>
          </li>
          <li className="nav-item">
            <a
              className="nav-link active p-2 border d-flex align-items-center rounded h-100"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="bi bi-bell"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6"></path>
              </svg>
            </a>
          </li>
        </ul>
        <Button
          className="btn rounded-circle border-0"
          style={{ background: "#00a76f", color: "rgb(255,255,255)" }}
          data-bs-toggle="modal"
          data-bs-target="#TRtype"
        >
                  <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
    </Navbar>
  );
}

export default TMS_Header
