import AstrobookWrapper from "@/components/AstrobookWrapper.astro";

export const decorators = [
  (story: any, context: any) => {
    return <AstrobookWrapper>{story(context)}</AstrobookWrapper>;
  },
];
