import { Label } from "@/components/ui/label";
import { Input, type InputProps } from "@/components/ui/input";

export const InputField = ({
  label,
  ...props
}: Readonly<{ label: string } & InputProps>) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label className="text-white">{label}</Label>
      <Input {...props} />
    </div>
  );
};
