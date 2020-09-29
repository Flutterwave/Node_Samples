import React from 'react';

const App = () => {
    return (  
        <div id="page-wrapper">
           <div className="row">
                <div className="col-lg-12">
                    <h1 className="page-header">Single Transfer</h1>
                </div>
            </div>


            <div className="row">                
                <div className="col-lg-10">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <i className="fa fa-table fa-fw"></i> Single Transfer
                        </div>
                        <div className="panel-body">
                            <p>Send money from your wallet to any bank account.</p>
                            <form >
                                <div className="form-group col-md-8">
                                    <label>Bank Name:</label><br />
                                    <select className="form-control" name="bank">
                                        <option value="">--select bank --</option>
                                       
                                    </select>
                                </div>
                                <div className="form-group col-md-8">
                                    <label>Account Number:</label><br />
                                    <input type="text" name="acctno" className="form-control" placeholder="0020176171" />
                                </div>
                                <div className="form-group col-md-8">
                                    <label>Amount to send:</label><br />
                                    <input type="text" name="amount" className="form-control" placeholder="3000" />
                                </div>
                                <div className="form-group col-md-8">
                                    <label>Narration:</label><br />
                                    <input type="text" name="comment" className="form-control" placeholder="Eg: Transfer for the goods delivered" />
                                </div>
                                <div className="form-group col-md-8">
                                    <input type="submit" name="stransfer" value="Transfer" className="btn btn-success pull-right" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
          
        </div>
    
    );
}
 
export default App;