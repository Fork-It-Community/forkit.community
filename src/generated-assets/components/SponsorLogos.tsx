export const SponsorLogos = ({ logos }: { logos: string[] }) => {
  const height = 140;
  const chunkSize = logos.length <= 6 ? logos.length : 4;
  const chunks: string[][] = [];
  for (let i = 0; i < logos.length; i += chunkSize) {
    chunks.push(logos.slice(i, i + chunkSize));
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        zIndex: 10,
        paddingBottom: 60,
      }}
    >
      {chunks.map((chunk, chunkIndex) => (
        <div
          key={chunkIndex}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {chunk.map((logo, index) => (
            <div
              key={logo}
              style={{
                display: "flex",
                alignItems: "center",
                height,
                marginBottom: -60,
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
              {index < chunk.length - 1 && (
                <div
                  style={{
                    fontSize: 28,
                    opacity: 0.3,
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
      ))}
    </div>
  );
};
export const SponsorLogosInsta = ({ logos }: { logos: string[] }) => {
  const height = 100;
  const chunkSize = logos.length <= 6 ? logos.length : 4;
  const chunks: string[][] = [];
  for (let i = 0; i < logos.length; i += chunkSize) {
    chunks.push(logos.slice(i, i + chunkSize));
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        zIndex: 10,
        paddingBottom: 4,
      }}
    >
      {chunks.map((chunk, chunkIndex) => (
        <div
          key={chunkIndex}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {chunk.map((logo, index) => (
            <div
              key={logo}
              style={{
                display: "flex",
                alignItems: "center",
                height,
                marginBottom: -10,
              }}
            >
              <img
                src={logo}
                alt=""
                style={{
                  height: 90,
                  objectFit: "contain",
                }}
              />
              {index < chunk.length - 1 && (
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
          ))}
        </div>
      ))}
    </div>
  );
};
