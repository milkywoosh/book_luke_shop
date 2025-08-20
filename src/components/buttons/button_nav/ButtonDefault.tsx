
import styles from "./ButtonDefault.module.css";

const ButtonDefault = ({ children, onclick }: any) => {

    return (
        <button
            className={styles.button}
            onClick={onclick}
        >
            {children}
        </button>
    )
}

export default ButtonDefault;