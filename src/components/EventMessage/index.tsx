import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import dayjs from "dayjs";
import type { ReactNode } from "react";
import { MdWarning } from "react-icons/md";

type Props =
  | {
      type: "postponed-without-date";
      children?: ReactNode;
      originalDate: Date | string;
    }
  | {
      type: "postponed-with-date";
      children?: ReactNode;
      originalDate: Date | string;
    };

export const EventMessage = (props: Props) => {
  if (props.type === "postponed-without-date" || "postponed-with-date") {
    const message =
      props.children ??
      (props.type === "postponed-without-date"
        ? `Dear community,<br />
    Due to a scheduling issue, we regret to inform you that this event will need to be postponed. We are currently
    working on setting a new date that works best for everyone. We’ll
    share the updated date as soon as it’s confirmed and will reopen
    registrations at that time. We apologize for any inconvenience
    this may cause and look forward to seeing you at the rescheduled
    event! Thank you for your understanding.`
        : null);
    return (
      <Alert
        variant={
          props.type === "postponed-without-date" ? "destructive" : "warning"
        }
        className="not-prose my-4"
      >
        <MdWarning />
        <AlertTitle className="text-sm italic">
          <strong>Event postponed</strong> · Originally scheduled on{" "}
          <strong>{dayjs(props.originalDate).format("MMM DD, YYYY")}</strong>
        </AlertTitle>
        {!!message && (
          <AlertDescription className="mt-2 text-sm">
            {typeof message === "string" ? (
              <p
                dangerouslySetInnerHTML={{
                  __html: message,
                }}
              />
            ) : (
              <p>{message}</p>
            )}
            <div className="mt-2">The Fork it! Team</div>
          </AlertDescription>
        )}
      </Alert>
    );
  }
  return null;
};
