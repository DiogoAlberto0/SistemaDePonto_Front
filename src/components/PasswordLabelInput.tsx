import { useState } from "react";
import { ILabelInputProps, LabelInput } from "./LabelInput";
import { Eye, EyeSlash } from "@phosphor-icons/react/dist/ssr";

interface IPasswordLabelInputProps extends ILabelInputProps {}

export const PasswordLabelInput = ({ children, type, ...restProps }: IPasswordLabelInputProps) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="flex items-end relative">
            <LabelInput
                type={isVisible ? 'text' : 'password'}
                className="w-full"
                inputClassName="pr-10"
                {...restProps}
            >
                {children}
            </LabelInput>
                <button
                    type="button"
                    onClick={() => setIsVisible(prev => !prev)}
                    className="absolute right-1 rounded p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                    {isVisible ? <EyeSlash size={24} /> : <Eye size={24} />}
                </button>
        </div>
    );
};
