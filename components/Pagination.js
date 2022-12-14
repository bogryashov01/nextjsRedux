import { useState } from 'react';
import styles from '../styles/Pagination.module.css';

function Pagination({
  data,
  RenderComponent,
  title,
  pageLimit,
  dataLimit,
  currentPage,
  setCurrentPage,
  router,
}) {
  const [pages] = useState(Math.round(data?.length / dataLimit));

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
    router.push(
      `/articles?page=${currentPage + 1}&historypath=${router.query?.historypath
        ?.split(',')
        ?.concat(router.pathname)}`,
    );
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
    router.push(
      `/articles?page=${currentPage - 1}&historypath=${router.query?.historypath
        ?.split(',')
        ?.concat(router.pathname)}`,
    );
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data?.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <div>
      <h1 className={styles.title}>{title}</h1>

      {/* show the posts, 10 posts at a time */}
      <div className={styles.dataContainer}>
        {getPaginatedData()?.map((d, idx) => {
          return (
            <div key={idx}>
              <RenderComponent data={d} router={router.query.page} />
            </div>
          );
        })}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={goToPreviousPage}
          className={`${styles.prev} ${currentPage === 1 ? styles.disabled : ''}`}>
          prev
        </button>

        {getPaginationGroup()?.map((item, index) => {
          return (
            <button
              key={index}
              className={`${styles.paginationItem} ${currentPage === item ? styles.active : null}`}>
              <span className={styles.number}>{item}</span>
            </button>
          );
        })}

        <button
          onClick={goToNextPage}
          className={`${styles.next} ${currentPage === pages ? styles.disabled : ''}`}>
          next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
