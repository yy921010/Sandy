import getReadingTime from "reading-time";
import { toString as mdastToString } from "mdast-util-to-string";

export function remarkReadingTime() {
  return (tree, { data }) => {
    const textOnPage = mdastToString(tree);
    const readingTime = getReadingTime(textOnPage);
    data.astro.frontmatter.minutesRead = readingTime.minutes;
  };
}
