import style from './footer.module.css'
const Footer = () => {
    return ( 
        <footer>
            <ul className={style.ul}>
                <li className={style.li}>
                    © All rights reserved.   
                </li>
            </ul>
        </footer>
    );
}
 
export default Footer;