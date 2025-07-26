// components/CardSkeleton.js
export default function CardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-2 w-full">
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
          <div className="h-3 w-60 bg-gray-200 rounded"></div>
        </div>
        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
      </div>

      <div className="flex justify-between w-full gap-5">
        {[1, 2].map((_, i) => (
          <div key={i} className="flex bg-[#F9FAFB] py-2 px-3 rounded-sm gap-3">
            <div className="h-15 w-20 bg-gray-200 rounded"></div>
            <div className="flex flex-col gap-1 w-full">
                <div className="h-4 w-28 bg-gray-200 rounded"></div>
                <div className="h-3 w-20 bg-gray-200 rounded"></div>
                <div className="h-3 w-40 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-6 border-gray-100" />

      <div className="flex justify-between w-full gap-2">
        <div className="h-10 w-full bg-gray-200 rounded-md"></div>
        <div className="h-10 w-full bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
}