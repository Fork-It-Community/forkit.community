import { Fragment } from "react";

export const SponsorLogos = ({
  logos,
  height = 140,
}: {
  logos: string[];
  height?: number | undefined;
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        position: "relative",
        zIndex: 10,
        justifyContent: "center",
      }}
    >
      {logos.map((logo, index) => (
        <Fragment key={logo}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height,
              overflow: "hidden",
            }}
          >
            <img
              src={logo}
              alt=""
              style={{ height: 180, width: 180, objectFit: "contain" }}
            />

            {index < logos.length - 1 && (
              <div
                style={{
                  fontSize: 28,
                  opacity: 0.3,
                  paddingLeft: 8,
                  paddingRight: 8,
                }}
              >
                &times;
              </div>
            )}
          </div>
        </Fragment>
      ))}
    </div>
  );
};
