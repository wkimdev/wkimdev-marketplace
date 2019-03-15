function cmdLoadByAjax(url, params, method) {
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
};

function cmdCheckCookie() {
  var _member_no = $.cookie('MEMBER_NO');

  if (!_member_no) {
    location.href = '/admin';
  }
}

function cmdOpenModal(_id) {
  $('#' + _id).modal();
}

function getUrlParameter(queryString) {
  queryString = queryString.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + queryString + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

exports.cmdLoadByAjax = cmdLoadByAjax;
exports.cmdCheckCookie = cmdCheckCookie;
exports.cmdOpenModal = cmdOpenModal;
exports.getUrlParameter = getUrlParameter;
