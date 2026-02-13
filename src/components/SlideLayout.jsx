export default function SlideLayout({ children, className = '' }) {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center px-8 py-16 md:px-16 lg:px-24 overflow-y-auto ${className}`}
    >
      {children}
    </div>
  );
}
