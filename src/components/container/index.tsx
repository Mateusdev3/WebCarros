import type { ReactNode } from "react";

export function Container({children}: {children:ReactNode}){
    return(
        <div className="w-full h-full max-w-7xl px-4 flex justify-center flex-col mx-auto">
            {children}
        </div>
    )
}