/**
 * Pagination: On page change
 * @param pagination
 * @returns {Promise<void>}
 */
const onPageChange = async (pagination) => {
  console.log(pagination)
  // if (pagination.current !== ) {
  //   this.params.page = pagination.current;
  //   await this.fetchList();
  // }
}

export default function usePaginations () {
  return {
    onPageChange
  }
}
