export default function Multichoice() {
    return (
        <div className="flex justify-center items-center mt-10">
            <div className="grid grid-rows-[2fr_3fr] max-w-4xl w-full bg-[#ECFEE8] min-h-[50vh] max-h-[70vh] overflow-y-auto">


                <div className="border border-gray-300">
                    Question
                </div>


                <div className="grid grid-cols-2 grid-rows-2">
                    <div className="border border-gray-300">1</div>
                    <div className="border border-gray-300">2</div>
                    <div className="border border-gray-300">3</div>
                    <div className="border border-gray-300">4</div>
                </div>


            </div>
        </div>


    );
}

