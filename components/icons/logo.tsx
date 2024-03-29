import { SVGProps, useEffect, useState } from "react";

import { useInterval } from "@mantine/hooks";

import { motion } from "framer-motion";

type LogoProps = SVGProps<SVGSVGElement> & {
  animate?: boolean;
};

const Logo: React.FC<LogoProps> = (props: LogoProps) => {
  const [toggle, setToggle] = useState(false);
  const { animate, ...rest } = props;
  const ticker = useInterval(() => {
    setToggle(!toggle);
  }, 1400);

  useEffect(() => {
    if (animate) {
      ticker.start();
      return ticker.stop;
    }
    return () => {};
  }, [animate, ticker]);

  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 117 16"
      {...rest}
      style={{ overflow: "visible" }}
    >
      <title>Peerpoint</title>
      <path
        d="M19.32 15a.4.4 0 0 1-.4-.42l.6-12.3a.4.4 0 0 1 .4-.37h4.79c.99 0 1.83.19 2.5.57.69.37 1.2.9 1.53 1.56.34.67.48 1.44.44 2.3a4.76 4.76 0 0 1-.68 2.3c-.4.67-.97 1.19-1.7 1.56a5.7 5.7 0 0 1-2.6.56h-3.3l.12-2.22h2.84c.53 0 .98-.1 1.34-.28.36-.18.63-.44.82-.77.19-.33.3-.71.3-1.14.03-.44-.04-.83-.2-1.15-.15-.32-.4-.57-.74-.75a2.75 2.75 0 0 0-1.3-.28H22.2l-.53 10.45a.4.4 0 0 1-.4.38h-1.96zm11.29 0a.4.4 0 0 1-.4-.42l.61-12.3a.4.4 0 0 1 .4-.37h8.02c.23 0 .41.2.4.42l-.1 1.86H33.5l-.15 3.12h5.6l-.12 2.28h-5.6l-.15 3.13h6.08l-.1 1.9a.4.4 0 0 1-.4.38h-8.04zm10.66 0a.4.4 0 0 1-.4-.42l.61-12.3a.4.4 0 0 1 .4-.37h8.02c.23 0 .41.2.4.42l-.1 1.86h-6.04L44 7.31h5.6l-.11 2.28h-5.6l-.16 3.13h6.08l-.1 1.9a.4.4 0 0 1-.4.38h-8.04zm10.66 0a.4.4 0 0 1-.4-.42l.62-12.3a.4.4 0 0 1 .4-.37h4.77c1 0 1.83.18 2.51.53.69.35 1.2.84 1.53 1.48.34.64.49 1.4.44 2.27a4.42 4.42 0 0 1-.67 2.24 3.9 3.9 0 0 1-1.7 1.43c-.73.33-1.6.5-2.6.5h-3.45l.11-2.23h3c.54 0 .98-.07 1.34-.21.36-.15.63-.36.82-.65.18-.3.29-.65.3-1.08a2 2 0 0 0-.2-1.1 1.5 1.5 0 0 0-.76-.68 3.12 3.12 0 0 0-1.3-.24h-1.87L54.28 15h-2.35zm6.95-5.96 2.66 5.38a.4.4 0 0 1-.36.58h-2.4l-2.89-5.96h2.99zM63.42 15a.4.4 0 0 1-.4-.42l.61-12.3a.4.4 0 0 1 .4-.37h4.78c1 0 1.83.19 2.51.57.68.37 1.2.9 1.52 1.56.34.67.49 1.44.44 2.3a4.76 4.76 0 0 1-.67 2.3c-.4.67-.97 1.19-1.7 1.56a5.7 5.7 0 0 1-2.6.56H65l.11-2.22h2.85c.53 0 .97-.1 1.33-.28.36-.18.63-.44.82-.77.2-.33.3-.71.31-1.14.03-.44-.04-.83-.2-1.15-.15-.32-.4-.57-.74-.75a2.75 2.75 0 0 0-1.31-.28H66.3l-.52 10.45a.4.4 0 0 1-.4.38h-1.97zm23.22-6.5a7.82 7.82 0 0 1-.98 3.63 6 6 0 0 1-5.43 3.05 6.05 6.05 0 0 1-3.12-.8 5.3 5.3 0 0 1-2.09-2.3 7.44 7.44 0 0 1-.62-3.67c.06-1.42.39-2.63.97-3.62.58-1 1.34-1.75 2.29-2.27.94-.53 2-.79 3.15-.79 1.16 0 2.2.27 3.1.8.9.53 1.6 1.3 2.1 2.31.49 1.01.7 2.23.63 3.67zm-2.79-.09a5.69 5.69 0 0 0-.3-2.31 3.01 3.01 0 0 0-1.07-1.44 2.94 2.94 0 0 0-1.7-.48 3.26 3.26 0 0 0-3.06 1.97 6.11 6.11 0 0 0-.54 2.36c-.04.92.05 1.69.3 2.32.24.62.6 1.1 1.08 1.42.47.32 1.04.48 1.7.48.68 0 1.28-.17 1.8-.5.52-.33.94-.82 1.25-1.46a6 6 0 0 0 .54-2.36zm7.16-6.51c.23 0 .41.2.4.43l-.6 12.29a.4.4 0 0 1-.4.38h-1.98a.4.4 0 0 1-.4-.42l.62-12.3a.4.4 0 0 1 .4-.37H91zm12.87 0c.23 0 .41.2.4.43l-.61 12.29a.4.4 0 0 1-.4.38h-1.8a.4.4 0 0 1-.34-.18l-5.15-8.06h-.1L95.47 15h-2.35a.4.4 0 0 1-.4-.42l.61-12.3a.4.4 0 0 1 .4-.37h1.82a.4.4 0 0 1 .34.18l5.13 8.05h.12l.4-8.23h2.34zm2.15 2.3a.4.4 0 0 1-.4-.43l.08-1.48a.4.4 0 0 1 .4-.38h9.95c.23 0 .41.2.4.42l-.08 1.48a.4.4 0 0 1-.4.38h-3.62l-.52 10.43a.4.4 0 0 1-.4.38h-1.94a.4.4 0 0 1-.4-.42l.52-10.39h-3.59z"
        fill="currentColor"
      />
      <g stroke="#FD7E14" strokeLinecap="round">
        <motion.g
          animate={{
            opacity: toggle ? 0.65 : 1,
            strokeWidth: toggle ? 1 / 0.8 : 1,
            scale: toggle ? 0.8 : 1,
            translateY: toggle ? 3 : 0,
            translateX: toggle ? -1 : 0,
            rotate: toggle ? -8 : 0,
          }}
          transition={{
            type: "spring",
            damping: 9,
            stiffness: 130,
          }}
        >
          <path d="M2.5 6.59v2.56a1 1 0 0 1-1 1v0a1 1 0 0 1-1-1V6.17c0-.92.75-1.67 1.67-1.67H8a1 1 0 0 1 1 1v0a1 1 0 0 1-1 1H5.67c-.37 0-.67.3-.67.67v2.25c0 .05 0 .1.02.16l1.13 4.6c.13.56-.21 1.13-.77 1.26v0a1.04 1.04 0 0 1-1.25-.8l-.46-2.28c-.04-.21-.34-.22-.39-.01l-.6 2.34c-.15.56-.7.9-1.27.76v0a1.05 1.05 0 0 1-.77-1.3l1.1-4" />
          <ellipse cx={3.5} cy={2.5} rx={1.5} ry={2} />
        </motion.g>
        <motion.g
          animate={{
            opacity: toggle ? 1 : 0.65,
            scale: toggle ? 0.8 : 1,
            strokeWidth: toggle ? 1 : 1 / 0.8,
            translateY: toggle ? 1 : 0,
            translateX: toggle ? 2.5 : 0,
            rotate: toggle ? 3.5 : 0,
          }}
          transition={{ type: "spring" }}
        >
          <path d="M13.5 6.59v2.56a1 1 0 0 0 1 1v0a1 1 0 0 0 1-1V6.17c0-.92-.74-1.67-1.66-1.67H8a1 1 0 0 0-1 1v0a1 1 0 0 0 1 1h2.34c.36 0 .66.3.66.67v2.25c0 .05 0 .1-.02.16l-1.13 4.6c-.13.56.21 1.13.77 1.26v0c.57.14 1.14-.23 1.26-.8l.45-2.28c.04-.21.34-.22.4-.01l.6 2.34c.14.56.7.9 1.26.76v0c.58-.14.93-.73.77-1.3l-1.1-4" />
          <ellipse cx={12.5} cy={2.5} rx={1.5} ry={2} />
        </motion.g>
      </g>
    </svg>
  );
};

Logo.defaultProps = {
  animate: false,
};

export default Logo;
