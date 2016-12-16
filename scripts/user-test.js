const API_URL = getHostUrl();

$(document).ready(function(){
  console.log(window.location.search);
  const params = parseQuery(window.location.search);
  // getUserInfo(params);

  console.log(params);

});

function parseQuery(query) {
  query.substr(1).split('&').reduce((params, keyValue) => {
    const parts = keyvalue.split('=');
    params[0] = parts[1];
    return params;
  }, {});
}

function getUserInfo(id) {
  return $.get(`${API_URL}/user/${id}`)
}


function addUserInfoToPage(user) {
  let source = $('user-template').html();
  let template = Handlebars.compile(source);
  let context = user;
  let html = template(context);
  $('.user').html(html);
  return user.id;
}

//
function getHostUrl(){
  // -1 if it doesn't exist
  if (window.location.host.indexOf('localhost') != -1) {
    return 'http://localhost/:3000';
  } else {
    return // 'heroku-Url'

  }
}
