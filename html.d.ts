declare namespace React {
  interface HtmlHTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    "data-theme"?: string;
  }
}
