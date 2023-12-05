const DateFormat = ({ movieDate }) => {
  const movieString = "" + movieDate;
  const parts = movieString.split("-");
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  const dateFormat = `${year}/${month}/${day}`;

  return <>{movieDate ? `${dateFormat}(PH)` : "Unreleased"}</>;
};
export default DateFormat;
