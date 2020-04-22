import tw from "twin.macro";
const collectText = (el, acc = []) => {
  if (el) {
    if (typeof el === "string") acc.push(el);
    if (Array.isArray(el)) el.map((item) => collectText(item, acc));
    if (typeof el === "object") collectText(el.props && el.props.children, acc);
  }
  return acc.join("").trim();
};

const StyledLink = tw.a`ml-12 mx-0 mr-6`;

export default ({ children: component, id }: { children: any; id?: any }) => {
  const children = component.props.children || "";
  let text = children;

  if (null == id) {
    id = collectText(text)
      .toLowerCase()
      .replace(/\s/g, "-")
      .replace(/[?!:]/g, "");
  }

  return (
    <StyledLink href={`#${id}`} id={id}>
      {component}
    </StyledLink>
  );
};
