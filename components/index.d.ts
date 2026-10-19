import type * as React from 'react';

export type Elevation = 0 | 1 | 2 | 3 | 4;
export type IconName =
  | 'arrow-right' | 'arrow-left' | 'external' | 'chevron-down' | 'chevron-right' | 'plus' | 'minus'
  | 'close' | 'check' | 'menu' | 'search' | 'bag' | 'user' | 'heart' | 'book' | 'code' | 'gift'
  | 'mail' | 'info' | 'alert' | 'download';
export type Option = string | { value: string; label: React.ReactNode; disabled?: boolean };

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary: sage fill, once per view. secondary: ink outline. quiet: underlined text. Default primary. */
  variant?: 'primary' | 'secondary' | 'quiet';
  /** md (48px, default) or sm (36px) for dense rows. */
  size?: 'md' | 'sm';
  /** Renders an <a> instead of a <button>. */
  href?: string;
  /** Icon before / after the caption. */
  icon?: IconName;
  iconAfter?: IconName;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): React.ReactElement;

export interface IconProps {
  name: IconName;
  /** px, default 20. */
  size?: number;
  /** Accessible name; leave out when the icon sits beside a word. */
  label?: string;
  className?: string;
}
export declare function Icon(props: IconProps): React.ReactElement | null;
export declare namespace Icon { const names: IconName[]; }

export interface FieldProps {
  /** Visible label, always shown. */
  label: string;
  /** Helper text under the field. */
  hint?: string;
  /** Error message; shows the field in `danger` and replaces the hint. */
  error?: string;
}
export interface TextFieldProps extends FieldProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children'> {}
export declare function TextField(props: TextFieldProps): React.ReactElement;
export interface TextAreaProps extends FieldProps, React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
export declare function TextArea(props: TextAreaProps): React.ReactElement;
export interface SelectProps extends FieldProps, Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  options: Option[];
  /** A first, unselectable option such as "Choose a size". */
  placeholder?: string;
}
export declare function Select(props: SelectProps): React.ReactElement;

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
}
export declare function Checkbox(props: CheckboxProps): React.ReactElement;

export interface RadioGroupProps {
  legend: React.ReactNode;
  options: Option[];
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}
export declare function RadioGroup(props: RadioGroupProps): React.ReactElement;

export interface TagProps {
  /** neutral (ink outline, default), signal (sage fill), ochre (ochre fill). */
  tone?: 'neutral' | 'signal' | 'ochre';
  children?: React.ReactNode;
  className?: string;
}
export declare function Tag(props: TagProps): React.ReactElement;

export interface CardProps {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  /** An image or placeholder shown edge to edge above the body. */
  media?: React.ReactNode;
  /** Bottom row, usually a quiet Button or link. */
  footer?: React.ReactNode;
  children?: React.ReactNode;
  /** Shadow level 0–4. Default 0: cards sit flat on the page. */
  elevation?: Elevation;
  /** Makes the whole card a link that lifts to level 2 on hover. */
  href?: string;
  /** Lift on hover without being a link (when the card holds its own button). */
  interactive?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}
export declare function Card(props: CardProps): React.ReactElement;

export type MenuItem = '-' | { label: React.ReactNode; icon?: IconName; href?: string; onSelect?: (e: React.MouseEvent) => void; separator?: boolean };
export interface MenuProps {
  /** The trigger button's caption. */
  label: React.ReactNode;
  items: MenuItem[];
  /** Open from the right edge of the trigger. */
  align?: 'start' | 'end';
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  defaultOpen?: boolean;
  className?: string;
}
export declare function Menu(props: MenuProps): React.ReactElement;

export interface ToastProps {
  /** One short sentence. */
  children: React.ReactNode;
  action?: { label: string; onClick?: () => void; href?: string };
  onClose?: () => void;
  /** false hides it. Default shown. */
  open?: boolean;
  /** Render in place instead of fixed at the bottom of the screen (previews only). */
  inline?: boolean;
  className?: string;
}
export declare function Toast(props: ToastProps): React.ReactElement | null;

export interface DialogProps {
  open: boolean;
  title: React.ReactNode;
  children?: React.ReactNode;
  /** Buttons, right-aligned; primary last. */
  actions?: React.ReactNode;
  /** Called by the close button, Escape and a click on the scrim. */
  onClose?: () => void;
  /** Render in place instead of fixed over the page (previews and docs only). */
  inline?: boolean;
  className?: string;
}
export declare function Dialog(props: DialogProps): React.ReactElement | null;

export interface HeaderNavItem { label: string; href: string; current?: boolean }
export interface HeaderProps {
  nav?: HeaderNavItem[];
  logoHref?: string;
  logoHeight?: number;
  /** An optional control at the end, e.g. a small Button or a Menu. */
  action?: React.ReactNode;
  /** Level-2 shadow, for when the page scrolls under a sticky header. */
  elevated?: boolean;
  className?: string;
}
export declare function Header(props: HeaderProps): React.ReactElement;

export interface LogoProps {
  /** lockup (mark + stacked wordmark, default) or mark. */
  variant?: 'lockup' | 'mark';
  /** Height in px. Default 48. Minimum 32 for the lockup, 20 for the mark. */
  height?: number;
  /** One-colour version: no sage. */
  mono?: boolean;
  /** Accessible name. Pass '' when a parent link already names it. */
  label?: string;
  className?: string;
}
export declare function Logo(props: LogoProps): React.ReactElement;

declare global {
  interface Window {
    TwoPlusThree: {
      Button: typeof Button; Icon: typeof Icon; TextField: typeof TextField; TextArea: typeof TextArea;
      Select: typeof Select; Checkbox: typeof Checkbox; RadioGroup: typeof RadioGroup; Tag: typeof Tag;
      Card: typeof Card; Menu: typeof Menu; Toast: typeof Toast; Dialog: typeof Dialog;
      Header: typeof Header; Logo: typeof Logo;
    };
  }
}
