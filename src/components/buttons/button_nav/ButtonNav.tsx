
import styles from "./ButtonNav.module.css";

const ButtonNav = ({ children, onclick }: any) => {

    return (
        <button
            className={styles.button}
            onClick={onclick}
        >
            {children}
        </button>
    )
}

export default ButtonNav;