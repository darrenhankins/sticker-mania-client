const API_URL = getHostUrl();

$(document).ready(function() {
  const params = parseQuery(window.location.search);

  getUserInfo(params.id)
    .then(addUserInfoToPage)
    .then(getStickers)
    .then(addStickers);
});


function getHostUrl() {
  if (window.location.host.indexOf('localhost') != -1) {
    return 'http://localhost:3000';
  } else {
    return 'https://mhw-sticker-mania.herokuapp.com';
  }
}

function parseQuery(query) {
  return query.substr(1)
    .split('&')
    .reduce((params, keyValue) => {
      const parts = keyValue.split('=');
      params[parts[0]] = parts[1];
      return params;
    }, {});
}

function getUserInfo(id) {
  return $.get(`${API_URL}/user/${id}`);
}

function getStickers(id) {
  return $.get(`${API_URL}/user/${id}/sticker`);
}

function addStickers(stickers){
  let source = $('#sticker-template').html();
  let template = Handlebars.compile(source);
  let context = {stickers}; // {stickers:stickers} is the same
  let html = template(context);
  $('.stickers').html(html);
}


function addUserInfoToPage(user) {
  let source = $('#user-template').html();
  let template = Handlebars.compile(source);
  let context = user;
  let html = template(context);
  $('.user').html(html);
  return user.id;
}
