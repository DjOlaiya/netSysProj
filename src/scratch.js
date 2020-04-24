
 ipid_handler =() => {
    var that = this;
    var api_key = 'at_qIUZKL7SFb1owEqipEoN5zIHeULon';
    var api_url = 'https://geo.ipify.org/api/v1?';
    var url = api_url + 'apiKey=' + api_key + '&ipAddress=';
   http.get(url, (res) => {
     const { statusCode } = res;
     const contentType = res.headers['content-type'];
   
     let error;
     if (statusCode !== 200) {
       error = new Error('Request Failed.\n' +
                         `Status Code: ${statusCode}`);
     } else if (!/^application\/json/.test(contentType)) {
       error = new Error('Invalid content-type.\n' +
                         `Expected application/json but received ${contentType}`);
     }
     if (error) {
       console.error(error.message);
       // Consume response data to free up memory
       res.resume();
       return;
     }
   
     res.setEncoding('utf8');
     let rawData = '';
     res.on('data', (chunk) => { rawData += chunk; });
     res.on('end', () => {
       try {
         const parsedData = JSON.parse(rawData);
         // userDetails = parsedData;
         // that.setState({ipvalue: parsedData['isp']})
         // console.log(that.state.ipvalue)
         // console.log(parsedData);
       } catch (e) {
         console.error(e.message);
       }
     });
   }).on('error', (e) => {
     console.error(`Got error: ${e.message}`);
   });
  }

  


      // first three lines of this pulled from the ipifiy.org list of examples.
      // var http = require('http');
      // http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
      //   resp.on('data', function(ip) {
      //     console.log("this is IP: " + ip);
      //     // get previously-saved ip addresses
      //     var savedIPdata = document.cookie.replace(/(?:(?:^|.*;\s*)seenip\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      //     // split into iterable thing
      //     console.log("savedIPdata: " + savedIPdata);
      //     var seenIPs = savedIPdata.split(',');
      //     console.log("seenIps: " + seenIPs);
      //     // create stickynote for future reference
      //     var newIP = true;
      //     // iterate over the previously-saved ip addresses
      //     for (var i = 0; i < seenIPs.length; i++) {
      //       // if we've seen our current ip, jot that down on the sticky
      //       if (ip == seenIPs[i]) {
      //          newIP = false;
      //          break;
      //       }
      //     }
      //     if (newIP) {
      //       document.cookie = "seenip="+ip+","+savedIPdata;
      //       var myip = ip
      //       return myip
      //     }
      //   });
      // }); 