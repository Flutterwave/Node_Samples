import React, {useState, useEffect} from 'react';
import {getBanks, singleTransfer} from '../../utils'


const App = () => {
    const [data, setData] = useState({
        bank: "",
        acctno: "",
        amount: "",
        comment: "",

    })
    const [banks, setBanks] = useState([])
    const handleSubmit = (e) => {
        e.preventDefault()
        const user = JSON.parse(
            sessionStorage.getItem("userData")
          );
          if(Number(data.amount) > Number(user.walletamount)){
              alert("sorry you do not have enough money in you wallet")
          }else{
              console.log("requesting")
              singleTransfer(data)
          }


    }

    useEffect(() => {
        const fetchBanks = async() =>  {
            const res = await getBanks()
                setBanks(res)
        }
        fetchBanks()

    },[])

    const handleInputChange = (e) => {

        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

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
                            <form onSubmit={handleSubmit} >
                                <div className="form-group col-md-8">
                                    <label>Bank Name:</label><br />
                                    <select onChange={handleInputChange} className="form-control" name="bank" required>
                                        <option value="">--select bank --</option>
                                         {banks.map(bank =>  <option key={bank.id} value={bank.code}>{bank.name}</option>)}
                                       
                                    </select>
                                </div>
                                <div className="form-group col-md-8">
                                    <label>Account Number:</label><br />
                                    <input  onChange={handleInputChange} value={data.acctno} type="text" name="acctno" required className="form-control" placeholder="0020176171" />
                                </div>
                                <div className="form-group col-md-8">
                                    <label>Amount to send:</label><br />
                                    <input  onChange={handleInputChange} value={data.amount}  type="text" name="amount" required className="form-control" placeholder="3000" />
                                </div>
                                <div className="form-group col-md-8">
                                    <label>Narration:</label><br />
                                    <input type="text" onChange={handleInputChange} value={data.comment}  name="comment" required className="form-control" placeholder="Eg: Transfer for the goods delivered" />
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