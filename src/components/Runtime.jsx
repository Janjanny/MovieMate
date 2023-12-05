const Runtime = ({ runtime }) => {
  const hours = runtime / 60;
  const minutes = runtime % 60;

  return (
    <>
      {runtime > 15
        ? `${Math.floor(hours)}h ${minutes}m${" "}`
        : `${runtime} Season`}
    </>
  );
};
export default Runtime;
