import styles from "./SuccessPopUp.module.css";

type SuccessPopUpMsg = {
    message: string,
    data: any
}

type SuccessPopUpProps = {
    success: SuccessPopUpMsg;
    onClose: () => void;
};

const SuccessPopUp = (
    { success, onClose }: SuccessPopUpProps
) => {

    return (
        <div className={styles.errorWrapper}>
            <button onClick={onClose}> close</button>
            <p>Success Info: {success.message}</p>
        </div>
    )
}

export default SuccessPopUp;