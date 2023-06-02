import React from 'react';
import styles from './Layout.module.scss';

function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <main className={styles.main}>{props.children}</main>
    </>
  );
}

export default Layout;
