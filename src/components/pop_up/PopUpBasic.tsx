
const PopUp = ({ message, onClose, }: { message: string, onClose: any }) => {

    return (<div className="mt-2">
        <div className="justify-items-center border border-green-500 w-36">
            <div className="flex flex-col justify-items-center">
                <button onClick={onClose} > <span className="border-green-500 w-4 p-2 text-center">close! </span></button>
                <h3 className="text-center">{`pop up`}</h3>
                <h3 className="text-center">{`info error:`}</h3>
                <h3 className="text-center">{`${message}`}</h3>
            </div>
        </div>
    </div>);
}

export default PopUp;