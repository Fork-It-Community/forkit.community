import { Label } from "@/oldcomponents/ui/label";
import { Input, type InputProps } from "@/oldcomponents/ui/input";

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
