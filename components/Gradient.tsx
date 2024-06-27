export default function Gradient({
  children,
  color = "",
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const _style = color
    ? ({
        ...style,
        "--tw-gradient-to": `${color} var(--tw-gradient-to-position)`,
      } as React.CSSProperties)
    : style;

  return (
    <div className={`relative z-10 h-full px-6 pt-10 ${className}`}>
      <div
        className="absolute inset-0 -z-10 h-[calc((100vh_-_96px)/2)] bg-gradient-to-t from-neutral-900 to-neutral-600"
        style={_style}
      ></div>

      {children}
    </div>
  );
}
