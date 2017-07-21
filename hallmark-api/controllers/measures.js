import moment from 'moment';
var mssql = require('mssql');

const config = {
  server: "Hpl-Dsql2\\HPLDsql2",
  user: "NOndracek",
  password: "Hallmark17",
  database: "Mobile_App",
};



export const sqlConnect = (callback) => {

  var conn = new mssql.ConnectionPool(config);
  var req = new mssql.Request(conn);

  // mssql.close()

  conn.connect((err) => {
    if (err) {
      console.log(err);
      return;
    }

    req.query('SELECT * FROM measureData', (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log(result.recordset);
        callback(result.recordset);
      }
      conn.close()
    })

    // new mssql.Request().query('SELECT * FROM measureData', (err, result) => {
    //   console.log(JSON.parse(JSON.stringify(result)));
    //   callback(result)
    })
  };



  // con.Request().query('SELECT * FROM measureData', function (err, result) {
  //   if (err) throw err;
  //   console.log(result);
  //   callback(result)
  // });



export const getData = (req, res, next) => {

  sqlConnect((data) => {
        res.json({
          measureTypes: data
        })
  });

};
