const SpeedDialButtonItemTemplate = (data) => {
  return (
    <>
    {!data?.disable && 
      <a
        href="#"
        role="menuitem"
        className={`p-speeddial-action ${data?.inactive && "disabled"}`}
        aria-label={data?.label}
        tabIndex="-1"
        data-pr-tooltip={data?.label}
        data-pc-section="action"
        onClick={data?.inactive ? "":data?.command}
      >
        <span
          className={`p-speeddial-action-icon ${data?.icon}`}
          data-pc-section="actionicon"
        ></span>
      </a>}
    </>
  );
};
export default SpeedDialButtonItemTemplate;
