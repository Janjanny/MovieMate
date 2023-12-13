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
    "linear-gradient(180deg, #0A0A0A 0%, rgba(0, 0, 0, 0.00) 53.51%, #0A0A0A 100%), linear-gradient(90deg, #0A0A0A 0%, rgba(0, 0, 0, 0.00) 60.64%, rgba(0, 0, 0, 0.00) 100%)",
};

export const detailsOverlay = {
  ...backgroundOverlay,
  zIndex: 2,
  background:
    "linear-gradient(180deg, #0A0A0A 0%, rgba(0, 0, 0, 0.30) 53.45%, #0A0A0A 100%)",
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
