import styles from "./ErrorPopUp.module.css";

type ErrorPopUpMsg = {
    message: string,
    data: any
}
export type { ErrorPopUpMsg }; // export the type so i can be used anywhere

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