import type * as React from "react";

export interface LogoProps {
  /** lockup (mark + stacked wordmark, default) or mark. */
  variant?: "lockup" | "mark";
  /** Height in px. Default 48. Minimum 32 for the lockup, 20 for the mark. */
  height?: number;
  /** One-colour version: no sage. */
  mono?: boolean;
  /** Accessible name. Pass '' when a parent link already names it. */
  label?: string;
  className?: string;
}
export declare function Logo(props: LogoProps): React.ReactElement;
