import 'bootstrap/dist/css/bootstrap.min.css';

async function sendLogin(event:React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formElem= new FormData(form);

    onSubmitLogin(formElem);
}

function onSubmitLogin(formData:any){
    try{
        let user:String = formData.get('email');
        let pss:String = formData.get('password');

        console.log(user);
    }catch(err){
        console.log("error", err);
    }
}


function LoginForm(){
    return(
        <div className="container">
            <div className="login">
            <div className="card" id="login">
            <form id="loginform" onSubmit={sendLogin}>
                <div className="row" id="loginTitle">
                    iBABY Login
                </div>
                <div className="row">
                    <a>Enter email address</a>
                    <input type="email" placeholder="Email address" name="email"></input>
                </div>
                <div className="row">
                    <a>Enter password</a>
                    <input type="password" placeholder="Password" name="password"></input>
                </div>
                <div className="row">
                    <button type="submit" value="submit">Submit</button>
                </div>   
            </form>
            </div>
        </div>
        </div>
    )
}

export default LoginForm;
