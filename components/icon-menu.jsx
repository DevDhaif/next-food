const { cn } = require("@/lib/utils");

function IconMenu({ className, icon, text }) {
  return (
    <div
      className={cn(
        "flex flex-row text-center items-center justify-center space-x-2",
        className
      )}
    >
      {icon}
      <span className="text-sm">{text}</span>
    </div>
  );
}

export default IconMenu;
