module.exports = () => {
  const DEFAULT_PAGE_SIZE = 20;
  const DEFAULT_PAGE_NUMBER = 1;
  const MAX_PAGE_SIZE = 200;

  const pagedJson = (req, res) => dataArray => {
    const { pageNumber, pageSize } = req.paging;
    const data = [...dataArray];
    const paging = {
      pageNumber,
      pageSize,
      hasMore: false
    };

    if (dataArray.length > pageSize) {
      paging.hasMore = true;
      data.length = pageSize;
    }

    res.json({
      paging,
      data
    });
  };

  return (req, res, next) => {
    const pageNumber = parseInt(req.query.page_number || DEFAULT_PAGE_NUMBER);
    let pageSize = parseInt(req.query.page_size || DEFAULT_PAGE_SIZE);

    if (pageSize > MAX_PAGE_SIZE) {
      pageSize = MAX_PAGE_SIZE;
    }

    req.paging = {
      pageNumber,
      pageSize,
      skip: (pageNumber - 1) * pageSize,
      limit: pageSize + 1
    };

    res.pagedJson = pagedJson(req, res);
    next();
  };
};
