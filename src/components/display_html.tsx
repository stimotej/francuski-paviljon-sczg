import clsx from "clsx";
import React from "react";
import DOMPurify from "isomorphic-dompurify";

interface DisplayHTMLProps {
  html: string;
  className?: string;
}

function replaceAnchorsWithDivs(inputText: string) {
  const anchorRegex = /\[#(.*?)\]/g;
  const replacedText = inputText.replace(anchorRegex, '<div id="$1"></div>');
  return replacedText;
}

const DisplayHTML: React.FC<DisplayHTMLProps> = (props) => {
  const cleanHtml = DOMPurify.sanitize(props.html, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: replaceAnchorsWithDivs(cleanHtml) }}
      className={clsx("html-content include-filters", props.className)}
    ></div>
  );
};

export default DisplayHTML;
