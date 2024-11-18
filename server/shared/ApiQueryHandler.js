class ApiQueryHandler {
  static getQueries(args) {
    let { page, size, sort } = args;
    let sorting;

    size = size !== undefined ? parseInt(size, 10) : 10;
    page = page !== undefined ? parseInt(page, 10) : 1;
    const skip = (page - 1) * size;

    if (sort) {
      const splittedSort = sort.split(",");
      sorting = splittedSort
        .map((param) => {
          const [field, order] = param.split(":");
          return `${field} ${order}`;
        })
        .join(", ");
    } else {
      sorting = "created_at desc";
    }
    return { page, size, skip, sorting };
  }
}

export default ApiQueryHandler;
