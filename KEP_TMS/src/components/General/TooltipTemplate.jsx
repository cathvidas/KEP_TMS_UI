import { OverlayTrigger, Tooltip } from "react-bootstrap";
import proptype from "prop-types"
const TooltipTemplate = ({ title, item, placement = "right"}) => {
  const tooltip = (
    <Tooltip>
      <span>{title}</span>
    </Tooltip>
  );
  return (
    <>
      <OverlayTrigger placement={placement} overlay={tooltip}>
        {item}
      </OverlayTrigger>
    </>
  );
};
TooltipTemplate.propTypes = {
  title: proptype.string.isRequired,
  item: proptype.any.isRequired,
  placement: proptype.string,
};
export default TooltipTemplate;
