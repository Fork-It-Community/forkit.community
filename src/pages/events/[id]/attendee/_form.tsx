import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Form = () => {
  return (
    <form
      className="relative z-0 flex w-full flex-col gap-3 rounded-lg bg-white/5 p-8 shadow-2xl backdrop-blur-md"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        if (!name) {
          toast.error("Please, provide your name");
          return;
        }
        window.location.href = `${window.location.pathname}/${formData.get("name")}`;
      }}
    >
      <h1 className="text-center font-heading text-lg font-medium uppercase tracking-widest text-white">
        Share your venue
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
        >
          Generate
        </Button>
      </div>
    </form>
  );
};
