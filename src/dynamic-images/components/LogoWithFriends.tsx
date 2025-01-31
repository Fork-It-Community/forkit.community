import { Logo } from "@/components/Logo";
import { LogoIcon } from "@/components/LogoIcon";
import { COLORS } from "@/dynamic-images/utils";
import { Fragment } from "react";

export const LogoWithFriends = (props: { logos?: string[] | undefined }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        columnGap: 12,
        rowGap: 0,
        alignItems: "center",
      }}
    >
      {props.logos?.length ? (
        <LogoIcon
          style={{
            width: 27 * 5,
            height: 18 * 5,
            marginRight: 40,
            color: COLORS.primary,
          }}
        />
      ) : (
        <Logo
          style={{
            width: 169 * 3,
            height: 18 * 3,
          }}
        />
      )}

      {props.logos?.map((logo) => (
        <Fragment key={logo}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 48,
              opacity: 0.2,
            }}
          >
            &times;
          </div>
          <img
            src={logo}
            alt=""
            style={{
              width: 160,
              height: 160,
              objectFit: "cover",
              zIndex: 10,
            }}
          />
        </Fragment>
      ))}
    </div>
  );
};
