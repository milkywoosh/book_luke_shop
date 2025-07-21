import styles from "./ErrorPopUp.module.css";

type ErrorPopUpMsg = {
    message: string,
    data: any
}

type ErrorPopUpProps = {
    error: ErrorPopUpMsg;
    onClose: () => void;
};

const ErrorPopUp = (
    { error, onClose }: ErrorPopUpProps
) => {

    return (
        <div className={styles.errorWrapper}>
            <button onClick={onClose}> close</button>
            <p>Error Info: {error.message}</p>
        </div>
    )
}

export default ErrorPopUp;