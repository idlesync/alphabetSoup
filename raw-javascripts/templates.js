module.exports = function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["app/templates/addRoom.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"row\">\n  <div class=\"col-md-12\">\n    <form class=\"form-inline\" role=\"form\">\n      <div class=\"form-group\">\n        <label for=\"roomName\">Create a new room</label>\n        <input type=\"text\" class=\"form-control\" id=\"roomName\" placeholder=\"Room Name\">\n      </div>\n      <div class=\"radio\">\n        <label class=\"radio-inline\">\n          <input type=\"radio\" name=\"letter-circles-or-squares\" value=\"circles\" checked> Circles\n        </label>\n      </div>\n      <div class=\"radio\">\n        <label class=\"radio-inline\">\n          <input type=\"radio\" name=\"letter-circles-or-squares\" value=\"squares\"> Squares\n        </label>\n      </div>\n      <div class=\"checkbox\">\n        <label class=\"checkbox-inline\">\n          <input type=\"checkbox\" name=\"letter-shadows\" value=\"shadows\" checked> Shadows\n        </label>\n      </div>\n      <button type=\"submit\" class=\"btn btn-primary\">Create Room</a>\n    </form>\n  </div>\n</div>\n";
  });

this["JST"]["app/templates/homeContent.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"add-room\"></div>\n<div id=\"list-rooms\"></div>\n";
  });

this["JST"]["app/templates/letter.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  if (helper = helpers.character) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.character); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n";
  return buffer;
  });

this["JST"]["app/templates/listRooms.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"col-md-12\">\n  <div class=\"panel panel-default\">\n    <table class=\"table table-hover\">\n      <thead>\n        <tr>\n          <th>Rooms Names</th>\n          <th>Letter Shapes</th>\n          <th></th>\n        </tr>\n      </thead>\n      <tbody></tbody>\n    </table>\n  </div>\n</div>\n";
  });

this["JST"]["app/templates/listRoomsItem.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n    has shadows\n  ";
  }

function program3(depth0,data) {
  
  
  return "\n    &nbsp;\n  ";
  }

  buffer += "<td>\n  <a href=\"/rooms/";
  if (helper = helpers._id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0._id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a>\n</td>\n<td>\n  ";
  if (helper = helpers.letterItem) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.letterItem); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</td>\n<td>\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.letterShadows), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</td>\n";
  return buffer;
  });

this["JST"]["app/templates/roomDetails.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h1>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h1>\n\n<div id=\"letters-container\"></div>\n";
  return buffer;
  });

return this["JST"];

};