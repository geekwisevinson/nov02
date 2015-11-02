

function Crud_objects() {
    this.username = '';
    this.password = '';
    this.token = '';
    this.auth_type = '';
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
    this.method_getuser =function(){
        return this.github.getUser();
    };
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
    this.callback_usergists= function(){
        alert('this is the usergists callback')
    }
}


obj = new Crud_objects();
obj.token = atob("YThlOTk0MTkzMzlhMmNmNmM4YTQ1ODE2ZmY2OTE2OGY5NDE0NzBhYw==");
obj.auth_type = 'token';
obj.username = 'geekwisevinson';
obj.github = obj.method_github();
obj.user = obj.method_getuser();
obj.gist_list = obj.method_usergists();



