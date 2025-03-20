import proptype from "prop-types";
const ErrorTemplate = ({message, center, className}) => {
return <small className={`text-red d-block ${center ? 'text-center' : ''} ${className}`}>{message?.message ?? message}</small>
}
ErrorTemplate.propTypes = {
    message: proptype.string,
    center: proptype.bool,
    className: proptype.string
}
export default ErrorTemplate;