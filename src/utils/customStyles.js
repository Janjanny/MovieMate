export const backgroundOverlay = {
  content: '""',
  position: "absolute",
  width: "100%",
  height: "100%",
};

export const afterOverlay = {
  ...backgroundOverlay,
  zIndex: 2,
  background:
    "linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 50.56%, rgba(0, 0, 0, 0.53) 100%), linear-gradient(90deg, #030303 0%, rgba(0, 0, 0, 0.00) 60.64%, rgba(0, 0, 0, 0.00) 100%) ",
};

export const popularCardShadow = {
  content: "''",
  width: "100%",
  height: "100%",
  position: "absolute",
  transition: "all 300ms ease",

  background:
    "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0.82%, rgba(0, 0, 0, 0.60) 100%)",
};
