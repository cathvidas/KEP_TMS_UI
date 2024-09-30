import proptype from "prop-types";
const ErrorTemplate = ({message}) => {
return <small className="text-red d-block ">{message}</small>
}
ErrorTemplate.proptTypes = {
    message: proptype.string
}
export default ErrorTemplate;