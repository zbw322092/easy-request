var easyRequest = require('../lib/index.js');

var options = {
	protocol: 'http:',
	hostname: 'www.baidu.com',
	path: '/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd=node.js&rsv_pq=9a2c72f200041150&rsv_t=dc52KrNKFnh8NQH1%2BzM4T%2FJgP%2F3GUp5R1HhYY2KG9QBvs8U5xTVvnNpF7jc&rqlang=cn&rsv_enter=1&rsv_sug3=7&rsv_sug1=7&rsv_sug7=100&rsv_sug2=0&inputT=2603&rsv_sug4=2603',
	method: 'GET'
};
// easyRequest(options, function(err, data) {
// 	if (err) {
// 		console.log(err.message);
// 	}

// 	console.log('search result: ', data);
// });

var resData = easyRequest(options, function(err, data) {
	if (err) {
		console.log(err.message);
	}
});

resData.on('data', function(data) {
	console.log(data);
});