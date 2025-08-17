
import { Link } from "react-router-dom";
import ButtonNav from "../buttons/button_nav/ButtonNav";
import styles from "./PageNavigation.module.css";
import { RoutesAll } from "../../App";

const PageNavigation = () => {
    // note: link route page mengikuti path di App.tsx
    return (
        <>
            <nav className={styles.navbar}>
                <ul className={styles.menu}>
                    {/* <Link to={RoutesAll.meal_datatable}><ButtonNav children={<li>Home</li>} onclick={() => {}} /></Link> */}
                    <Link to={RoutesAll.meal_datatable_aggrid}><ButtonNav children={<li>Home</li>} onclick={() => {}} /></Link>
                    <Link to={RoutesAll.register_new_meal}><ButtonNav children={<li>Register New Meal</li>} onclick={() => {}} /></Link>
                    <Link to={RoutesAll.list_of_packages}><ButtonNav children={<li>List of Packages</li>} onclick={() => {}} /></Link>
                </ul>
            </nav>

        </>
    )
};

export default PageNavigation;