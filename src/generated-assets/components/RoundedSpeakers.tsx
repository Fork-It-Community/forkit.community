export const RoundedSpeakers = (props: { speakerImages: string[] }) => {
  return (
    <div style={{ display: "flex" }}>
      {props.speakerImages.map((image, index) => (
        <img
          src={image}
          style={{
            borderRadius: 100,
            width: 80,
            height: 80,
            marginLeft: index === 0 ? 0 : -25,
            border: "solid 4px black",
          }}
        />
      ))}
    </div>
  );
};
