
type BoxDataProps = {
    data: { name: string }[]
}

const BoxData = ({ data }: BoxDataProps) => {
    return (
        <div >
            <ul className="flex flex-col">
                {
                    data.map((e, i) => {
                        return (
                            <li className="h-20 w-40 px-2 py-3" key={i}>
                                <button className="w-full text-center border border-green-500 px-5 py-5 hover:bg-green-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ...">
                                    {e.name}
                                </button>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default BoxData;