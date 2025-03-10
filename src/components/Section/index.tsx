import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"


interface SectionProps {
    title: string,
    description?: string,
    note?: string,
    btn?: string,
    children?: React.ReactNode

}


export default function Section({title, description, note, btn, children}: SectionProps) {
    return (
     <div className="mx-auto container flex flex-col gap-4 md:items-center justify-center space-y-5 my-10 px-4">
         <h4 className="text-sm font-bold bg-gradient-to-t from-secondary w-fit to-primary-foreground dark:text-white  px-4 py-2 border border-primary-foreground rounded-full  ">{note}</h4>
        <div className="">
            <h1 className="text-3xl sm:text-5xl sm:max-w-[750px] md:text-center font-semibold ">{title}</h1>
        </div>
        <div className="lg:w-2/5 md:text-center text-balance flex flex-col gap-4 items-center z-30">
            {description && <p className="text-muted-foreground">{description}</p>}
            {
                btn && <Link href="#" className={`bg-gradient-to-bl w-full md:w-fit text-2xl from-primary-foreground to-5% ${buttonVariants({variant:"outline",size:"lg" })}`}>{btn}</Link>
            } 
            
        </div>
        {children}
     </div>
    )
  }