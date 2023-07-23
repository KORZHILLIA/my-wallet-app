import { ReactComponent as Logo } from 'assets/svg/logo.svg';

import type { HeaderProps } from 'constants/types';

import styles from './Header.module.scss';

const Header = ({children}: HeaderProps) => {
    return (<header className={styles.header}>
        <div className={styles.container}>
        <Logo className={styles.logo} />
        {children}
        </div>
    </header>);
};

export default Header;