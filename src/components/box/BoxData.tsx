
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
                            <li className="px-3 py-3 " key={i}>
                                <div className=" text-center border border-green-500 px-5 py-5 hover:bg-green-600">
                                    {e.name}
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default BoxData;