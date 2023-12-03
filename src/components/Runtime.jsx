const Runtime = ({ runtime }) => {
  const hours = runtime / 60;
  const minutes = runtime % 60;

  return (
    <>
      {Math.floor(hours)}h {minutes}m{" "}
    </>
  );
};
export default Runtime;
