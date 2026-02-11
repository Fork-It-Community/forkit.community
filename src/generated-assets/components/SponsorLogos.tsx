import { Fragment } from "react";

export const SponsorLogos = ({ logos }: { logos: string[] }) => {
  const height = 140;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        zIndex: 10,
        flexWrap: "wrap",
        paddingBottom: 4,
        justifyContent: "center",
      }}
    >
      {logos.map((logo, index) => (
        <div
          key={logo}
          style={{
            display: "flex",
            alignItems: "center",
            height,
          }}
        >
          <img
            src={logo}
            alt=""
            style={{
              height: 180,
              width: 180,
              objectFit: "contain",
            }}
          />
          {index < logos.length - 1 && (
            <div
              style={{
                fontSize: 28,
                opacity: 1,
                paddingLeft: 40,
                paddingRight: 40,
              }}
            >
              &times;
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export const SponsorLogosInsta = ({ logos }: { logos: string[] }) => {
  const height = 100;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        zIndex: 10,
        flexWrap: "wrap",
        paddingBottom: 4,
        marginLeft: logos.length > 6 ? -24 : 0,
      }}
    >
      {logos.map((logo, index) => (
        <Fragment key={logo}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height,
            }}
          >
            <img
              src={logo}
              alt=""
              style={{
                height: 130,
                width: 130,
                objectFit: "contain",
              }}
            />

            {index < logos.length - 1 && (
              <div
                style={{
                  fontSize: 14,
                  opacity: 0.3,
                  paddingLeft: 4,
                  paddingRight: 4,
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
