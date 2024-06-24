export default function Gradient({
  children,
  color = "",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  const style = color
    ? ({
        "--tw-gradient-to": `${color} var(--tw-gradient-to-position)`,
      } as React.CSSProperties)
    : {};

  return (
    <div className="relative z-10 px-6 pt-10">
      <div
        className="absolute inset-0 -z-10 h-[calc((100vh_-_96px)/2)] bg-gradient-to-t from-neutral-900 to-neutral-600"
        style={style}
      ></div>

      {children}
    </div>
  );
}
