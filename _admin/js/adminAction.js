//const __common = require("../util/common.js");
__common = {
  cmdLoadByAjax: function(url, params, method) {
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

    /*리스트용 데이터 타입*/
    // function getDataTypeforList() {
    //   var selDataType = $("#sdtype option:selected").val();
    //   console.log($("#sdtype option:selected").val());
    //   if (selDataType != "") {
    //     $.ajax({
    //       url: '/getDataType',
    //       method: 'post',
    //       data: {
    //         datatype: selDataType
    //       },
    //       success: function(result) {
    //         var json = $.parseJSON(result);
    //         dtypejson = json
    //         getData(selDataType);
    //       },
    //       error: function(err) {
    //         console.log(err.toString());
    //         alert('데이터 통신에러');
    //         return;
    //       }
    //     });
    //   } else {
    //     alert('조회할 데이터 타입을 선택해주세요');
    //     return;
    //   }
    // }
  },
  cmdSendByAjax: function(_obj, _form) {
    $('form').ajaxForm({
      url: '/util/FileUpload',
      enctype: 'multipart/form-data',

      beforeSubmit: function(data, form, option) {
        console.info('beforeSubmit');
        console.info(data);
        console.info(form);
        console.info('beforeSubmit');
        //validation체크
        //막기위해서는 return false를 잡아주면됨
        return true;
      },
      success: function(response, status) {
        console.info(response);

        $('#Location').val(response.Location);
      },
      error: function() {
        console.info('error');
      }
    });

    $('#' + _form).submit();
  },
  cmdCheckCookie: function() {
    var _member_no = $.cookie('MEMBER_NO');

    if (!_member_no) {
      location.href = '/admin';
    }
  },
  cmdOpenModal: function(_id) {
    $('#' + _id).modal();
  },
  getUrlParameter: function(queryString) {
    queryString = queryString.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + queryString + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  },
};



var __login = {
  init: function() {
    console.log('Loin Init');

    // this._id = null;
    // this._pw = null;
  },
  cmdLogin: function(_this) {
    //this.init();

    var _formValue = {};
    _formValue.id = _this.data.id;

    var _returnJson = __common.cmdLoadByAjax('/member/login', JSON.stringify(_formValue));

    _returnJson.done(function(_data) {
      // alert(JSON.stringify(_data));
      if (_data.resultData) {
        location.href = '/admin/index.html';
      }
    });
  },
  cmdLogout: function() {
    $.cookie('memberNo', null);
    $.cookie('memberType', null);
    $.cookie('nm', null);
    $.cookie('email', null);
  }
};
