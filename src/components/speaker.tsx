import type { Person } from "@/content/people/people";
import { ICONS } from "./icons";

export const SpeakerDetail = (props: Readonly<{ speaker: Person }>) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="mx-auto aspect-square overflow-hidden rounded-lg">
        <img
          src={props.speaker.avatar}
          alt={`${props.speaker.name} profile picture`}
        />
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-lg font-semibold leading-6 tracking-tight text-white md:text-xl">
            {props.speaker.name}
          </h2>
          {!!props.speaker.job && (
            <p className="text-neutral-400">{props.speaker.job}</p>
          )}
          {!!props.speaker.company && (
            <div>
              {!!props.speaker.company.href ? (
                <a
                  href={props.speaker.company.href}
                  target="_blank"
                  className="text-sm leading-5 text-neutral-400 underline transition hover:text-primary"
                >
                  {props.speaker.company.title}
                </a>
              ) : (
                <p className="text-sm leading-5 text-gray-400">
                  {props.speaker.company.title}
                </p>
              )}
            </div>
          )}
        </div>
        {!!props.speaker.socials && (
          <ul className="flex gap-x-2">
            {props.speaker.socials.map((social) => (
              <li key={social.type}>
                <a
                  href={social.href}
                  className="text-gray-400 transition hover:text-primary"
                  target="_blank"
                >
                  <span className="sr-only">{social.type}</span>
                  {ICONS[social.type]}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
