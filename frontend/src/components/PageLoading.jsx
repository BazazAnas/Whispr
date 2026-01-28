import { LoaderIcon } from "lucide-react"

const PageLoading = () => {
  return (
    <div className=" flex justify-center items-center h-screen  bg-slate-800">
        <LoaderIcon className="size-10 animate-spin" />
    </div>
  )
}

export default PageLoading