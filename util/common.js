module.exports = {

  cmdLoadByAjax(url, params, method) {
    var request = $.ajax({
      type: !method ? 'POST' : method,
      url: url,
      contentType: 'application/json; charset=utf-8',
      data: params,
      dataType: 'json',
      async: true,
      cache: false
    });

    return request;
  },

  isEmpty() {
    for (var key in this) {
      if (this.hasOwnProperty(key))
        return false;
    }
    return true;
  }
  // exports.cmdLoadByAjax = cmdLoadByAjax;
  // exports.cmdCheckCookie = cmdCheckCookie;
  // exports.cmdOpenModal = cmdOpenModal;
  // exports.getUrlParameter = getUrlParameter;
};
