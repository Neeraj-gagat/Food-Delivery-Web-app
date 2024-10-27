import { ReactNode } from "react"

export const AppbarButton = ({children, onClick}:{children: ReactNode, onClick:() => void }) => {
    return <div className="flex justify-center font-medium text-base cursor-pointer hover:text-red-700" onClick={onClick}>
        {children}
    </div>
}