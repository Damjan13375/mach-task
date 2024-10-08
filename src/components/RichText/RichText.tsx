import { RichTextNode } from "./RichText.types";

export const RichTextRenderer = ({ content }: { content: RichTextNode[] }) => {
  return (
    <>
      {content.map((node, index) => {
        switch (node.nodeType) {
          case "heading-2":
            return (
              <h2 key={index} className="text-2xl font-bold mt-6">
                {node.content && node.content[0]?.value}
              </h2>
            );
          case "paragraph":
            return (
              <p key={index} className="mt-4">
                {node.content?.map((child, i) => {
                  if (child.nodeType === "text") {
                    return child.value;
                  } else if (child.nodeType === "hyperlink") {
                    return (
                      <a
                        key={i}
                        href={child.data?.uri}
                        className="text-blue-500 font-bold"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {child.content?.[0]?.value}
                      </a>
                    );
                  }
                  return null;
                })}
              </p>
            );
          default:
            return null;
        }
      })}
    </>
  );
};


