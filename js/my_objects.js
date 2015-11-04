/** hello to all out there
*   so this first part is targeting the link for the css so that we can switch from one to another later on.
*   
*   @Object = Crud_objects have methods in it that allow access into github
* 
*/

var style_sheet = document.getElementsByTagName("link")[0];


function Crud_objects() {
    this.username = '';
    this.password = '';
    this.token = '';
    this.auth_type = '';
/**
*   initial contact with github server 
*/
    this.method_github = function () {
        if (this.auth_type === "token") {
            return new Github({
                token: this.token,
                auth: "basic"
            });
        }else{
            return new Github({
                username: this.username,
                password: this.password,
                auth: "basic"
            });
        }
    };
/** 
*   captures the user information off github
*/
    this.method_getuser =function(){
        return this.github.getUser();
    };
/** 
*   access the user gists files 
*/
    this.method_usergists=function() {
        window['usergist']= this;
        console.log('usergists');
        console.log(this);
        console.log(this.username);
        return this.user.userGists.bind(this)(this.username, function (err, res) {
            window['usergist'].gist_list =res;
            window['usergist'].callback_usergists();

        });
    };
/**
 *  database is accessed for user information for services allow for log in and tracking of group 
 */
    this.callback_usergists= function(){
        this.method_getdatabase('user_database');
        this.method_getdatabase('email_database');
        this.method_getdatabase('groups_database');
        this.method_getdatabase('access_database');
        this.method_getdatabase('gist_database');
    };
/**
 *  @param = database 
 */
    this.method_getdatabase=function(database){
        window['getdatabase']=this;
        // console.log(window['getdatabase']);
            for (var i = 0;i<this.gist_list.length;i++){
            var db = database;
        if (this.gist_list[i].description=== db){
            this[db + "_object_unread"] = this.github.getGist(this.gist_list[i].id);
        }
    }
    
    this[db +"_object_unread"].read(function(err,res){
        window['getdatabase'][db +"_object_read"] = res;// enables content to be readable
        window['getdatabase'][db +"_json"] = window['getdatabase'][db +"_object_read"].files[db+".JSON"].content;//gets content as string
        window['getdatabase'][db +"_json"] = JSON.parse( window['getdatabase'][db +"_json"] );// turns string into object
    });
    };
}
/**
*   object that hold tokens for api's and starts the running on mandrill api for confirm
*/
var obj_app;
obj_app = new Crud_objects();
obj_app.token = atob("YThlOTk0MTkzMzlhMmNmNmM4YTQ1ODE2ZmY2OTE2OGY5NDE0NzBhYw==");
obj_app.auth_type = 'token';
obj_app.username = 'geekwisevinson';
obj_app.github = obj_app.method_github();
obj_app.user = obj_app.method_getuser();
obj_app.gist_list = obj_app.method_usergists();
obj_app.email_client = new mandrill.Mandrill(atob("ZUNKYmRjcUdoS2NwSlpRMlowZ3kzUQ=="));

obj_app.email_client.method_random_code = function(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    this["random_code"]=text;
};
obj_app.email_client.method_send_email = function(){
    console.log(this);
    this.messages.send(this.params, function(res) {
        console.log(res);
    }, function(err) {
        console.log(err);
    });
}
obj_app.email_client.method_params =function(){
    console.log(this);
  obj_app.email_client.method_random_code();
  
this.html_string =  "Code:"+ this.random_code + '\ <br />'+"Congradulations  " + crud_input_username.value + "! please enter code to finished the sign up process. thank you and have a nice day!";  
this.params = {
        "message": {
            "from_email":"vinsonfernandez27@gmail.com",
            "to":[{"email":crud_input_email.value}],
            "subject": "Thanks for signing up",
            "html": this.html_string
        }
    };
/**
 * currently updates database with new users so stays up to date 
 */
    console.log(obj_app);
    obj_app.email_database_json[crud_input_email.value]={};
    obj_app.email_database_json[crud_input_email.value].password = crud_input_password.value;
    obj_app.email_database_json[crud_input_email.value].username = crud_input_username.value;
    obj_app.user_database_json[crud_input_username.value]={};
    obj_app.user_database_json[crud_input_username.value].password = crud_input_password.value;
    obj_app.user_database_json[crud_input_username.value].email = crud_input_email.value;
    obj_app.user_database_json[crud_input_username.value].random_code = this.random_code;
    obj_app.email_database_object_read.files["email_database.JSON"].content = JSON.stringify(obj_app.email_database_json);
    obj_app.email_database_object_unread.update(obj_app.email_database_object_read,function(){
    });
    obj_app.user_database_object_read.files["user_database.JSON"].content = JSON.stringify(obj_app.user_database_json);
    obj_app.user_database_object_unread.update(obj_app.user_database_object_read,function(){
/**
* sending email to new user
*/
        alert('updated gist')
        obj_app.email_client.method_send_email();
        alert('sent email verification');
    });
    
    
};


var body;

document.addEventListener('DOMContentLoaded',function(){
    body =document.getElementsByTagName('body')[0];
    page_turn('login.html');
});

var page_loader = new XMLHttpRequest();
page_loader.method_page_turn=function(href){
    this.open("GET", href, false);
    this.send();
    return this.responseText;
};

var page_turn = function(href){
    var page = href;
    body.innerHTML=page_loader.method_page_turn(href);
    function_addEventListenrs(href);
};
var css_change = function(href){
    style_sheet.href = href;
};








var function_addEventListenrs = function(href){
    
    
    
    
   if (href === 'login.html'){
       crud_submit_login.addEventListener('click',function(){
            obj_app.username= crud_input_username.value;
            obj_app.password= crud_input_password.value;
            if (obj_app.user_database_json.hasOwnProperty(crud_input_username.value)){
                    if(obj_app.user_database_json[crud_input_username.value].password === crud_input_password.value){
                        alert('successfully logged in');
                    }else{alert('username does not match password')}  
            }else{alert('username not found. Sign Up?')}
       });
       sign_up.addEventListener('click',function(){
           css_change('css/sign_up.css');
           page_turn('sign_up.html');
       });
   }
   
   
   
   
   
   
   
   
   
      if (href === 'sign_up.html'){
       crud_submit_sign_up.addEventListener('click',function(){
            obj_app.username= crud_input_username.value;
            obj_app.email=crud_input_email.value;
            obj_app.password= crud_input_password.value;
            obj_app.password_confirm = crud_input_password_confirm.value;
            if (obj_app.user_database_json.hasOwnProperty(crud_input_username.value)){
                alert('username already in use');
            }else{ 
                if (obj_app.email_database_json.hasOwnProperty(crud_input_email.value)){
                    alert('email is already in use');
                }else{
                    if (crud_input_password.value != '' && crud_input_password.value === crud_input_password_confirm.value){
                        obj_app.email_client.method_params();
                        alert('Congradulations! An email has been sent to you. Please verify email.');
                    }else{ alert('invalid password or mismatch password')}
                }
            }
       });
       login.addEventListener('click',function(){
           css_change('css/sign_up.css');
           page_turn('sign_up.html');
       });
   }
   
   
   
   
   
   
   
   
};