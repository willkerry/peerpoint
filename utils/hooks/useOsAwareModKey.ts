import { useOs } from "@mantine/hooks";

/** Return either `⌘` or `Ctrl+`, depending on the client OS.  */
export const useOsAwareModKey = (): "⌘" | "Ctrl+" => {
  const os = useOs();
  if (os === "macos") return "⌘";
  return "Ctrl+";
};
