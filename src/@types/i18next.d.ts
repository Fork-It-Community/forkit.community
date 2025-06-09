import { Resource } from "@/i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: Resource["en"];
    returnNull: false;
  }
}
