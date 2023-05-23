import React, {useRef, useEffect, InputHTMLAttributes, FC} from 'react';


interface InpuProps extends InputHTMLAttributes<HTMLInputElement>{
    id: string;
}

const Input: FC<InpuProps> = ({ id, children,  ...inputProps }) => {


    const inputRef = useRef<HTMLInputElement>(null)

    useEffect (() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    return (
        <>
        <div>
        <label htmlFor={id}>{children}</label>
        <input
        className="border flex-grow bg-white rounded-sm p-2"
        id={id} 
        ref={inputRef}  {...inputProps}
        />
        </div>
        </>
    )
}

export default Input