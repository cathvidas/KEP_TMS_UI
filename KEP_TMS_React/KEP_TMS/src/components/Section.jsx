export const SectionTitle = ({ title, ViewAll }) => {
  return (
    <div className="d-flex justify-content-between">
    <h6>{title}</h6>
    {ViewAll && <p>{ViewAll}</p>}
    </div>
  );
};
