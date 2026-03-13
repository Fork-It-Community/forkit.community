// Minimal XML serializer — avoids adding a dependency for a few tags.
type XmlAttrs = Record<string, string>;
type XmlNode = string | undefined | XmlObj;
type XmlObj = {
  _attrs?: XmlAttrs;
  [tag: string]: XmlNode | XmlAttrs | undefined;
};

function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function renderAttrs(attrs: XmlAttrs): string {
  return Object.entries(attrs)
    .map(([k, v]) => ` ${k}="${escapeXml(v)}"`)
    .join("");
}

function renderTag(tag: string, child: XmlNode): string {
  if (child === undefined) return "";
  if (typeof child === "string") return `<${tag}>${escapeXml(child)}</${tag}>`;

  const { _attrs, ...children } = child as XmlObj;
  const attrsStr = _attrs ? renderAttrs(_attrs) : "";
  const childKeys = Object.keys(children);

  if (childKeys.length === 0) return `<${tag}${attrsStr}/>`;

  const content = childKeys
    .map((k) => renderTag(k, children[k] as XmlNode))
    .join("");
  return `<${tag}${attrsStr}>${content}</${tag}>`;
}

export function toXml(obj: { [tag: string]: XmlNode }): string {
  return Object.entries(obj)
    .map(([tag, child]) => renderTag(tag, child))
    .join("");
}
