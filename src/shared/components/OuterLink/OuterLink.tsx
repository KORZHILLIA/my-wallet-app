import { OuterLinkProps } from "constants/types";

import styles from './OuterLink.module.scss';

const OuterLink = ({ linkAddress, label }: OuterLinkProps) => {
    return <a className={styles.link} href={linkAddress} target="_blank" rel='nofollow noopener noreferrer'>{label}</a>
};

export default OuterLink;