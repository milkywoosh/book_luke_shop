

const data: string[] = ["cat", "elephant", "turtle", "owl"]

const BoxData = () => {
    return (
        <div >
            <ul className="flex flex-row">
                {
                    data.map((e, i) => {
                        return (
                            <li key={i}>
                                <div className=" items-center justify-center border border-green-500 pt-5 pb-5">
                                    {e}
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