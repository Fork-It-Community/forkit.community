import { type ReactNode } from "react";

import { useCopyToClipboard } from "@uidotdev/usehooks";
import { FaBluesky, FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { MdCopyAll, MdDownload } from "react-icons/md";
import { toast } from "sonner";
import { match } from "ts-pattern";

import {
  ResponsiveDrawer,
  ResponsiveDrawerClose,
  ResponsiveDrawerContent,
  ResponsiveDrawerDescription,
  ResponsiveDrawerHeader,
  ResponsiveDrawerTitle,
  ResponsiveDrawerTrigger,
} from "@/components/ResponsiveDrawer";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils-client";

type Actions = "bluesky" | "x" | "facebook" | "copy" | "download" | "linkedin";

type ShareButtonProps = {
  children?: ReactNode;
  className?: string | undefined;
  pageUrl: string;
  message?: string;
  downloadName?: string;
  actions: Array<Actions>;
  title: string;
  description?: string;
};

export const ShareButton = (props: ShareButtonProps) => {
  const [, copyToClipboard] = useCopyToClipboard();
  return (
    <ResponsiveDrawer>
      <ResponsiveDrawerTrigger asChild>
        <Button
          variant="secondary-dark"
          className={cn("group gap-2", props.className)}
        >
          {props.children}
        </Button>
      </ResponsiveDrawerTrigger>
      <ResponsiveDrawerContent className="gap-0 p-0 max-sm:pb-8 sm:max-w-sm">
        <ResponsiveDrawerHeader className="p-4">
          <ResponsiveDrawerTitle>{props.title}</ResponsiveDrawerTitle>
          <ResponsiveDrawerDescription>
            {props.description ?? "Share on your favorite social networks"}
          </ResponsiveDrawerDescription>
        </ResponsiveDrawerHeader>

        <div className="flex flex-wrap gap-3 p-4 pt-0 max-sm:justify-center">
          {props.actions.map((action) =>
            match(action)
              .with("bluesky", () => (
                <ResponsiveDrawerClose asChild>
                  <a
                    href={getBlueskyShareUrl({
                      url: props.pageUrl,
                      message: props.message,
                    })}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: "secondary" }),
                      "flex-1 gap-2",
                    )}
                  >
                    <FaBluesky />
                    Bluesky
                  </a>
                </ResponsiveDrawerClose>
              ))
              .with("x", () => (
                <ResponsiveDrawerClose asChild>
                  <a
                    href={getTwitterShareUrl({
                      url: props.pageUrl,
                      message: props.message,
                    })}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: "secondary" }),
                      "flex-1 gap-2",
                    )}
                  >
                    <FaXTwitter />
                    Twitter
                  </a>
                </ResponsiveDrawerClose>
              ))
              .with("facebook", () => (
                <ResponsiveDrawerClose asChild>
                  <a
                    href={getFacebookShareUrl({
                      url: props.pageUrl,
                    })}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: "secondary" }),
                      "flex-1 gap-2",
                    )}
                  >
                    <FaFacebook />
                    Facebook
                  </a>
                </ResponsiveDrawerClose>
              ))
              .with("linkedin", () => (
                <ResponsiveDrawerClose asChild>
                  <a
                    href={getLinkedinShareUrl({
                      url: props.pageUrl,
                      message: props.message || "",
                    })}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: "secondary" }),
                      "flex-1 gap-2",
                    )}
                  >
                    <FaLinkedin />
                    LinkedIn
                  </a>
                </ResponsiveDrawerClose>
              ))
              .with("copy", () => (
                <ResponsiveDrawerClose asChild>
                  <button
                    type="button"
                    onClick={() => {
                      copyToClipboard(props.pageUrl);
                      toast.success("Link copied to clipboard!");
                    }}
                    className={cn(
                      buttonVariants({ variant: "secondary" }),
                      "flex-1 gap-2",
                    )}
                  >
                    <MdCopyAll />
                    Copy link
                  </button>
                </ResponsiveDrawerClose>
              ))
              .with("download", () => (
                <ResponsiveDrawerClose asChild>
                  <a
                    href={`${props.pageUrl}/social.jpg`}
                    download={props.downloadName ?? "social.jpg"}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      toast.success("Image will be downloaded soon...");
                    }}
                    className={cn(
                      buttonVariants({ variant: "secondary" }),
                      "flex-1 gap-2",
                    )}
                  >
                    <MdDownload />
                    Download Image
                  </a>
                </ResponsiveDrawerClose>
              ))
              .exhaustive(),
          )}
        </div>
      </ResponsiveDrawerContent>
    </ResponsiveDrawer>
  );
};

function getTwitterShareUrl(params: {
  url: string;
  message?: string | undefined;
}) {
  const encodedUrl = encodeURI(params.url);
  const encodedMessage = encodeURIComponent(
    params.message?.replace("Fork it!", "@ForkitCommunity") ?? "",
  );
  return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedMessage}`;
}

function getBlueskyShareUrl(params: {
  url: string;
  message?: string | undefined;
}) {
  const encodedUrl = encodeURI(params.url);
  const encodedMessage = encodeURIComponent(
    params.message?.replace("Fork it!", "@forkit.community") ?? "",
  );
  return `https://bsky.app/intent/compose?text=${encodedMessage}%20${encodedUrl}`;
}

function getFacebookShareUrl(params: { url: string }) {
  const encodedUrl = encodeURI(params.url);
  return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
}

function getLinkedinShareUrl(params: {
  url: string;
  message?: string | undefined;
}) {
  const shareText = params.message || "";
  const encodedText = encodeURIComponent(shareText + " " + params.url);
  return `https://www.linkedin.com/feed/?shareActive=true&text=${encodedText}`;
}
