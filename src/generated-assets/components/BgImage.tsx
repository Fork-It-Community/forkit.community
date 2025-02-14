export const BgImage = (props: {
  src: string;
  width: number;
  height: number;
  gradientAngle?: number | undefined;
}) => {
  const gradientAngle = props.gradientAngle ?? 45;
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        top: 0,
        left: 0,
        width: props.width,
        height: props.height,
      }}
    >
      <img
        src={props.src}
        alt=""
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: props.width,
          height: props.height,
          objectFit: "cover",
        }}
      />
      <img
        src={props.src}
        alt=""
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: props.width,
          height: props.height,
          objectFit: "cover",
          filter: "blur(10px)",
          maskImage: `linear-gradient(${gradientAngle}deg, black 40%, transparent 100%)`,
        }}
      />
      <div
        style={{
          background: `linear-gradient(${gradientAngle}deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 100%)`,
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 2,
        }}
      />
    </div>
  );
};
