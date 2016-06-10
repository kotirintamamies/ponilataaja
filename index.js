var request = require('request');
var shelljs = require('shelljs');

request('http://mlptaika.blogspot.fi/p/blog-page.html', function (error, response, body)
{
	if(!error && response.statusCode == 200)
	{
		batchDownload(findAddresses(body));
	}
}
)

function batchDownload(data)
{
	data.forEach(function(url)
	{
		shelljs.exec('youtube-dl ' + url);	
	})
}

function findAddresses(body)
	{
	var addresslist = [];
	var splits1 = body.split('dailymotion.com');

	splits1.forEach(function (part)
	{	
	
		if(part.indexOf('tästä')>-1)
		{
		var split1 = part.split('tästä');


		var split2=split1[0].split('">')[0];
		addresslist.push("http://www.dailymotion.com"+split2);
		}
	});
	return addresslist;
}
