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
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { type ReactNode } from "react";
import { FaFacebook, FaLinkedin, FaXTwitter, FaBluesky } from "react-icons/fa6";
import { MdCopyAll, MdShare, MdOutlineShare } from "react-icons/md";
import { toast } from "sonner";

type SocialShareButtonProps = {
  children?: ReactNode;
  className?: string | undefined;
  pageUrl: string;
  title?: string;
  message?: string;
  variant?:
    | "default"
    | "secondary"
    | "secondary-dark"
    | "link"
    | "link-neutral"
    | "custom";
  size?: "default" | "sm" | "lg" | "xs" | "icon";
};

export const SocialShareButton = (props: SocialShareButtonProps) => {
  const [, copyToClipboard] = useCopyToClipboard();

  const variant = props.variant || "secondary";
  const size = props.size || "default";

  // Special styles for link variants to better integrate with navigation
  const isLinkVariant = variant === "link" || variant === "link-neutral";
  const isCustom = variant === "custom";

  return (
    <ResponsiveDrawer>
      <ResponsiveDrawerTrigger asChild>
        {isCustom ? (
          <span className={props.className}>{props.children}</span>
        ) : isLinkVariant ? (
          <a
            className={cn(
              buttonVariants({ variant, size }),
              "group cursor-pointer gap-2",
              props.className,
            )}
          >
            {props.children || (
              <>
                <MdOutlineShare
                  className={isLinkVariant ? "text-base" : "text-lg"}
                />
                <span>Share</span>
              </>
            )}
          </a>
        ) : (
          <Button
            variant={variant}
            size={size}
            className={cn("group gap-2", props.className)}
          >
            {props.children || (
              <>
                <MdShare className="text-lg" />
                <span>Share</span>
              </>
            )}
          </Button>
        )}
      </ResponsiveDrawerTrigger>
      <ResponsiveDrawerContent
        className="gap-0 p-0 max-sm:pb-8 sm:max-w-sm"
        onOpenAutoFocus={(e) => {
          // Prevent automatic focus
          e.preventDefault();
        }}
      >
        <ResponsiveDrawerHeader className="p-4" autoFocus>
          <ResponsiveDrawerTitle>
            Share this {getContentType(props.pageUrl)}
          </ResponsiveDrawerTitle>
          <ResponsiveDrawerDescription>
            Share on your favorite social networks
          </ResponsiveDrawerDescription>
        </ResponsiveDrawerHeader>
        <div className="flex flex-wrap gap-3 p-4 pt-0 max-sm:justify-center">
          <ResponsiveDrawerClose asChild>
            <a
              href={getTwitterShareUrl({
                url: props.pageUrl,
                message: props.message || props.title || "",
              })}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "flex-1 gap-2",
              )}
              tabIndex={0} // Ensure it can receive focus
            >
              <FaXTwitter />
              Twitter
            </a>
          </ResponsiveDrawerClose>
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
          <ResponsiveDrawerClose asChild>
            <a
              href={getBlueskyShareUrl({
                url: props.pageUrl,
                message: props.message || props.title || "",
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
          <ResponsiveDrawerClose asChild>
            <a
              href={getLinkedinShareUrl({
                url: props.pageUrl,
                title: props.title || "",
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
        </div>
      </ResponsiveDrawerContent>
    </ResponsiveDrawer>
  );
};

function getContentType(url: string): string {
  if (url.includes("/events/")) return "event";
  if (url.includes("/podcasts/")) return "podcast";
  if (url.includes("/news/")) return "article";
  return "page";
}

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
  title?: string | undefined;
  message?: string | undefined;
}) {
  const shareText = params.message || params.title || "";
  const encodedText = encodeURIComponent(shareText + " " + params.url);
  return `https://www.linkedin.com/feed/?shareActive=true&text=${encodedText}`;
}
