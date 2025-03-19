import { ReactNode } from "react"

export const AppbarButton = ({children, onClick}:{children: ReactNode, onClick:() => void }) => {
    return <div className="flex justify-center font-bold text-xl cursor-pointer transition duration-300 hover:text-red-700" onClick={onClick}>
        {children}
    </div>
}