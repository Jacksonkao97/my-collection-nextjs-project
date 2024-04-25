// Components
import NewsTable from "@/app/components/NewsTable";
import SuggestionSlide from "@/app/components/SuggestionSlide";

const News = () => {
  return (
    <div className="flex flex-row w-full h-screen">
      <div className="grid grid-flow-row grid-cols-2 grid-rows-3 gap-5 w-1/3 min-w-96">
        <div className="col-span-2 row-span-2">
          <NewsTable />
        </div>
        <div className="col-span-2 row-span-1">
          <SuggestionSlide />
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  )
}

export default News