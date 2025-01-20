import * as React from "react";

declare namespace JSX {
  interface IntrinsicElements {
    "switch-theme": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
  }
}
