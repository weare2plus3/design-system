/**
 * The TWO+THREE logo as a React component, drawn live from the tokens so it
 * follows the theme: `ink` square and letters, `paper` digits, `signal` +s.
 * Needs tokens.css on the page.
 *
 * Same geometry and props as Logo in components/bundle.js; that file is the
 * reference. Guidelines: components/Logo/README.md
 */
import { createElement as h } from "react";

const MARK_D =
  "M11.93 11.65H51.08V74.35H11.93Z M11.93 27.20H30.10V35.05H11.93Z M32.91 50.78H51.08V58.62H32.91Z M58.93 35.05H98.08V97.75H58.93Z M58.93 50.78H77.10V58.62H58.93Z M58.93 74.35H77.10V82.20H58.93Z";
const PLUS_D = "M32.91 50.78H77.10V58.62H32.91Z M51.08 35.05H58.93V74.35H51.08Z";
const WORD_D =
  "M140.01 7.79V15H114.21V7.79Z M122.17 10.67H131.98V51.43H122.17Z M181.39 7.79H191.13L182.76 51.43H170.96L166.09 22.89L161.29 51.43H149.49L141.05 7.79H151.21L155.33 40.31L161.09 7.79H171.04L176.8 40.31L181.4 7.79Z M204.44 16.71V30.57H194.63V15.41C194.63 13.03 195.3 11.17 196.65 9.82C198 8.47 200.23 7.8 203.34 7.8H208.55V15.01H206.29C205.6 15.01 205.12 15.14 204.85 15.39C204.58 15.64 204.44 16.09 204.44 16.73Z M204.44 28.72V42.51C204.44 43.1 204.58 43.54 204.85 43.81C205.12 44.08 205.6 44.22 206.29 44.22H208.49V51.43H203.34C200.23 51.43 198 50.76 196.65 49.41C195.3 48.06 194.63 46.2 194.63 43.82V28.72Z M211.37 42.51V28.92H221.18V43.81C221.18 46.19 220.52 48.05 219.19 49.4C217.86 50.75 215.65 51.42 212.53 51.42H207.11V44.21H209.58C210.27 44.21 210.74 44.07 210.99 43.8C211.24 43.53 211.37 43.09 211.37 42.5Z M211.37 30.57V16.71C211.37 16.07 211.24 15.62 210.99 15.37C210.74 15.12 210.27 14.99 209.58 14.99H207.25V7.78H212.53C215.64 7.78 217.86 8.46 219.19 9.8C220.52 11.15 221.18 13.01 221.18 15.39V30.55H211.37Z M140.01 62.11V69.32H114.21V62.11Z M122.17 65H131.98V105.76H122.17Z M143.37 62.11H153.11V105.75H143.37Z M163.55 80.57V87.78H151.06V80.57Z M161.9 62.11H171.57V105.75H161.9Z M177.68 62.11H187.49V105.75H177.68Z M194.56 80.85V71.04C194.56 70.4 194.43 69.95 194.18 69.7C193.93 69.45 193.46 69.32 192.77 69.32H180.49V62.11H195.72C198.83 62.11 201.05 62.79 202.38 64.13C203.71 65.48 204.37 67.34 204.37 69.72V81.86C204.37 84.19 203.71 86.03 202.38 87.38C201.05 88.73 198.83 89.4 195.72 89.4H181.31V82.47H192.77C193.46 82.47 193.92 82.34 194.18 82.09C194.44 81.84 194.56 81.42 194.56 80.82Z M187.56 85.58H197.3L206.56 105.75H196.06Z M209.86 62.11H219.74V105.75H209.86Z M233.19 62.11V69.32H213.77V62.11Z M233.74 98.55V105.76H213.77V98.55Z M231.2 79.95V87.16H214.39V79.95Z M237.93 62.11H247.81V105.75H237.93Z M261.26 62.11V69.32H241.84V62.11Z M261.81 98.55V105.76H241.84V98.55Z M259.27 79.95V87.16H242.46V79.95Z";
const WPLUS_D = "M237.52 26.05H267.51V33.32H237.52Z M247.88 15.54H257.14V43.81H247.88Z";
const LOCKUP_W = 267.51;
// One-colour mark: the square with the digits and an inset + cut clean through.
const MONO_D =
  "M0 0H110V110H0Z " +
  MARK_D +
  " M34.51 52.38 L52.68 52.38 L52.68 36.65 L57.33 36.65 L57.33 52.38 L75.50 52.38 L75.50 57.02 L57.33 57.02 L57.33 72.75 L52.68 72.75 L52.68 57.02 L34.51 57.02Z";

export function Logo({ variant = "lockup", height = 48, mono = false, label = "TWO+THREE", className }) {
  const mark = variant === "mark";
  const plus = mono ? "var(--ink)" : "var(--signal)";
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": "true" };

  return h(
    "svg",
    {
      viewBox: mark ? "0 0 110 110" : `0 0 ${LOCKUP_W} 110`,
      width: mark ? height : Math.round((height * LOCKUP_W) / 110),
      height,
      className: ["tt-logo", className].filter(Boolean).join(" "),
      xmlns: "http://www.w3.org/2000/svg",
      ...a11y,
    },
    mono ? h("path", { d: MONO_D, fillRule: "evenodd", style: { fill: "var(--ink)" } }) : null,
    mono ? null : h("rect", { width: 110, height: 110, style: { fill: "var(--ink)" } }),
    mono ? null : h("path", { d: MARK_D, fillRule: "evenodd", style: { fill: "var(--paper)" } }),
    mono ? null : h("path", { d: PLUS_D, style: { fill: plus } }),
    mark ? null : h("path", { d: WORD_D, style: { fill: "var(--ink)" } }),
    mark ? null : h("path", { d: WPLUS_D, style: { fill: plus } })
  );
}

export default Logo;
