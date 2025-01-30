import proptype from "prop-types";
const ErrorTemplate = ({message, center}) => {
return <small className={`text-red d-block ${center ? 'text-center' : ''}`}>{message}</small>
}
ErrorTemplate.propTypes = {
    message: proptype.string,
    center: proptype.bool
}
export default ErrorTemplate;