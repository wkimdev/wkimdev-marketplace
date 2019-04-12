var express = require('express');
var router = express.Router();
var Eos = require('eosjs');
var config = require('../config/developer');
var dateFormat = require('dateformat');

// eos blockchain setting

const eos = Eos({
  httpEndpoint: config.httpEndpoint,
  chainId: config.chainId,
  broadcast: true,
  sign: true
});

router.get('/myTransactions', function(req, res) {
  res.render('myTransactions', {
    //loginId: req.session.user.id
    loginId: 'bob'
  });
});

router.get('/getTransactionList', function(req, res) {

  var Account = 'bob';

  (async () => {
    var result = null;
    if (Account !== '') {
      try {
        var transactions = [];
        var arrTran = [];
        result = await eos.getActions(Account, -1, -20);
        if (result) {
          if (result.actions.length > 0) {
            var actions = result.actions;
            actions.forEach(function(el, i) {
              var action_id = el.account_action_seq;
              var block_id = el.action_trace.block_num;
              var trx_id = el.action_trace.trx_id;

              var block_time = el.action_trace.block_time;
              var timezoneoffset = (new Date().getTimezoneOffset() / 60) * -1;
              var nodeDate = new Date(block_time);
              nodeDate.setHours(nodeDate.getHours() + timezoneoffset);
              var timezonedate = dateFormat(nodeDate, "mmm-dd-yyyy, hh:MM:ss TT");

              var name = el.action_trace.act.name;

              var tran_info = [
                action_id,
                block_id,
                trx_id,
                timezonedate,
                name,
              ];

              if (!arrTran.includes(trx_id)) {
                transactions.push(tran_info);
                arrTran.push(trx_id);
              }

            })
            transactions.reverse();

            res.json({
              'result': 'OK',
              'rows': transactions
            });
          } else {
            res.json({
              'result': 'NONE'
            });
          }
        } else {
          res.json({
            'result': 'NONE'
          });
        }
      } catch (err) {
        res.json({
          'result': 'ERR'
        });
      }
    } else {
      res.json({
        'result': 'NONE'
      });
    }
  })();

});

module.exports = router;
