import Image from "next/image";

export default function UserCard({
  name,
  avatarUrl,
  passed,
  fastestTime,
  correctAnswers,
}: UserStatsCard) {
  return (
    <main className="px-8">
      <div className="bg-white shadow-md rounded-2xl p-4 flex  gap-8 w-full items-center mb-7">
        {/* Image */}
        <Image
          src={avatarUrl}
          alt={`${name} profile`}
          className=" size-52"
          width={500}
          height={500}
        />

        {/* Info */}
        <div className=" w-3/4">
          {/*  */}
          <div>
            <h2 className="text-lg font-bold text-gray-900">{name}</h2>
            <p className="text-sm text-gray-500">Voluptatem aut</p>
          </div>
          {/* Progress bar (dummy) */}
          <div className=" bg-gray-200 h-2 rounded mt-4">
            <div className="bg-bl h-2 rounded w-2/3"></div>
          </div>
          {/* Stats */}
          <div className="flex justify-between text-center ">
            <div className="flex justify-between items-center text-center mt-2">
              <Image
                src="/assets/icons/true.png"
                alt="Logo"
                width={100}
                height={100}
                className="mt-8"
                layout="intrinsic"
              />
              <div>
                <p className="text-lg font-bold ">{passed}</p>
                <p className="text-xs text-gray-500">Quiz Passed</p>
              </div>
            </div>
            <div className="flex justify-between text-center mt-2  items-center">
              <Image
                src="/assets/icons/Frame 5.png"
                alt="Logo"
                width={100}
                height={100}
                className="mt-8"
                layout="intrinsic"
              />
              <div>
               <p className="text-lg font-bold ">{fastestTime}</p>
              <p className="text-xs text-gray-500">Fastest Time</p>
              </div>
            </div>
            <div className="flex justify-between text-center items-center mt-2">
                    <Image
              src="/assets/icons/true.png"
              alt="Logo"
              width={100}
              height={100}
              className="mt-8"
              layout="intrinsic"
            />
              <div>
                
              <p className="text-lg font-bold">{passed}</p>
              <p className="text-xs text-gray-500">Quiz Passed</p>
              </div>
            
            </div>
          
          </div>
        </div>
      </div>
    </main>
  );
}
