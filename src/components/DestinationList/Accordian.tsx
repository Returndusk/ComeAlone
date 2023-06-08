import React, { useState } from 'react';
import styles from './Accordian.module.scss';

function Accordian(props: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.accordian}>
      <div
        className={
          isExpanded ? styles.expandedContents : styles.nonExpandedContents
        }
      >
        {props.children}
      </div>
      <button
        className={styles.accordianButton}
        onClick={handleToggleAccordion}
      >
        {isExpanded ? '접기' : '펼치기'}
      </button>
    </div>
  );
}

export default Accordian;
