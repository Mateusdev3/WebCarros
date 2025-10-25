import type { RegisterOptions, UseFormRegister } from "react-hook-form";


interface InputProps {
    type: string;
    placeholder: string;
    name: string;
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions;
}

export function Input({ type, placeholder, name, register, rules, error }: InputProps) {
    return (
        <div className="flex w-full py-2 flex-col" >
            <input className="w-full h-9 px-2 border-1 border-gray-100 rounded-lg"
                type={type}
                placeholder={placeholder}
                {...register(name, rules)}
                id={name} />
            {error && (
                <p className="text-red-500 text-xs ">{error}</p>
            )}
        </div>
    )
}