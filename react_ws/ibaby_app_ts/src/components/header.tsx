import 'bootstrap/dist/css/bootstrap.min.css';

function Header(){
    return(
        <>
        <div className="container" id="header">
            <div className="title-block" id="page-header">
                <div className="row">
                    <div className="col-sm-6">
                        <h1 id="title">i BABY</h1>
                    </div>
                    <div className="col-sm-6" id="sub">
                        <h2 id="subtitle">Monitoring System App</h2>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Header