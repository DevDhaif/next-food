import { Input } from "../ui/input";
import { Label } from "../ui/label";

function FormField({
  id,
  label,
  value,
  onChange,
  type = "text",
  className = "col-span-3",
}) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      <Input
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        type={type}
        className={className}
      />
    </div>
  );
}

export default FormField;
