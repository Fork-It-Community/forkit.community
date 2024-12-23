import { decorators } from "@/components/astrobook.config";
import { InputField } from "@/components/Input";

export default {
  component: InputField,
  decorators,
};

export const Default = {
  args: {
    label: "Input Label",
  },
};
