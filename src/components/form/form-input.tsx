/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface FormInputProps<T extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "form"> {
  name: Path<T>;
  label?: string;
  form: UseFormReturn<T, any, T>;
  className?: string;
}

function FormInput<T extends FieldValues>({
  form,
  name,
  label,
  className,
  ...props
}: FormInputProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="text-base font-medium">{label}</FormLabel>
          )}
          <FormControl>
            <Input className={className} {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormInput };
