import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export const Form = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <form
      className="relative z-0 flex w-full flex-col gap-3 rounded-lg bg-white/5 p-8 shadow-2xl backdrop-blur-md"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name")?.toString();
        if (!name) {
          toast.error("Please, provide your name");
          return;
        }
        setIsSubmitting(true);
        window.location.href = `${window.location.pathname}/${encodeURIComponent(name.replaceAll("/", ""))}`;
      }}
    >
      <h1 className="text-center font-heading text-lg font-medium uppercase tracking-widest text-white">
        Share your attendance
      </h1>
      <div className="relative">
        <Input
          id="name"
          name="name"
          placeholder="Your name"
          className="pr-24"
          autoFocus
        />
        <Button
          type="submit"
          size="xs"
          className="absolute right-1.5 top-1.5 z-10"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Generating..." : "Generate"}
        </Button>
      </div>
    </form>
  );
};
