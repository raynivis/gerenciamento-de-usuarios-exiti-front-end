import { forwardRef } from "react";

interface FormInputProps {
     label: string;
     name?: string;
     type?: "text" | "email";
     error?: string;
     placeholder?: string;
     required?: boolean;
     disabled?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
     (
          {
               label,
               name,
               type = "text",
               error,
               placeholder,
               required,
               disabled,
               ...rest
          },
          ref
     ) => {
          return (
               <div className="flex flex-col gap-2">
                    <label
                         htmlFor={name}
                         className="text-sm font-medium text-gray-700"
                    >
                         {label}
                         {required && (
                              <span className="text-red-500 ml-1">*</span>
                         )}
                    </label>
                    <input
                         ref={ref}
                         type={type}
                         id={name}
                         name={name}
                         placeholder={placeholder}
                         disabled={disabled}
                         className={`px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100 disabled:cursor-not-allowed ${
                              error
                                   ? "border-red-500 focus:ring-red-500"
                                   : "border-gray-300"
                         }`}
                         {...rest}
                    />
                    {error && (
                         <span className="text-sm text-red-500">{error}</span>
                    )}
               </div>
          );
     }
);

FormInput.displayName = "FormInput";

export default FormInput;
