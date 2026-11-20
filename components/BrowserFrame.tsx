type BrowserFrameProps = {
  /** Address shown in the fake URL bar. */
  url?: string;
  children: React.ReactNode;
  className?: string;
};

/** Screenshot holder styled as a minimal browser window. */
export default function BrowserFrame({
  url,
  children,
  className = "",
}: BrowserFrameProps) {
  return (
    <div className={`browser-frame ${className}`}>
      <div className="browser-frame-bar">
        <span className="browser-frame-dots">
          <i />
          <i />
          <i />
        </span>
        {url && <span className="browser-frame-url">{url}</span>}
      </div>
      <div className="browser-frame-screen">{children}</div>
    </div>
  );
}

/** "https://www.example.com/path" → "example.com" */
export function displayHost(link: string) {
  try {
    const { hostname, pathname } = new URL(link);
    const host = hostname.replace(/^www\./, "");
    if (host === "github.com") return `github.com${pathname.split("/").slice(0, 3).join("/")}`;
    return host;
  } catch {
    return link;
  }
}
