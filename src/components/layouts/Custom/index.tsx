import React, { ReactNode } from 'react';
import styles from './index.module.scss';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className={styles.adminLayout}>
      <header className={styles.header}>Admin Header</header>
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>Admin Footer</footer>
    </div>
  );
};

export default AdminLayout;
