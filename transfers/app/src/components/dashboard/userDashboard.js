import React, {useState} from 'react';
import Modal from 'react-animated-modal'
import {handlePay} from '../../utils'


const App = () => {
  const [showModal, setShowModal] = useState(false)
  const [amount, setAmount] = useState('')

  const user = JSON.parse(
    sessionStorage.getItem("userData")
  );

  const handleFundWallet = async (e) => {
      e.preventDefault()
      await  handlePay(amount)
    
  }


    return (  
        <div id="page-wrapper">
            <div className="row">
                <div className="col-lg-12">
                    <h1 className="page-header">Dashboard</h1>
                </div>
            </div>




            <div className="row">
                <div className="col-lg-4 col-md-6">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-3">
                                    <i className="fa fa-money fa-4x"></i>
                                </div>
                                <div className="col-xs-9 text-right">
                                <div className="huge"> {user? user.walletamount: "Unavailable"}</div>
                                <div className="cursor">Available Balance </div>
                                </div>
                            </div>
                        </div>
                        <a data-toggle="modal" data-target="#myModal">
                            <div className="panel-footer ">
                                <span onClick={() => setShowModal(true)} className="pull-left cursor">Fund Rave Wallet</span>
                                <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                <div className="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>


                <div className="col-lg-4 col-md-6">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-3">
                                    <i className="fa fa-money fa-4x"></i>
                                </div>
                                <div className="col-xs-9 text-right">
                                    <div className="huge">{user? user.walletamount: "Unavailable"}</div>
                                    <div>Ledger Balance</div>
                                </div>
                            </div>
                        </div>
                        <a data-toggle="modal" data-target="#myModal">
                            <div  className="panel-footer ">
                                <span onClick={() => setShowModal(true)} className="pull-left cursor">Fund Rave Wallet</span>
                                <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                <div className="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>

            </div>



                 <Modal
                  visible={showModal}
                  closemodal={() =>
                    setShowModal(false)
                  }
                  type="zoomIn"
                >


                <div className=" modal-sm">
                <div>

                    
                    <div className="modal-content">
                    <div className="modal-header">
                       <h4 className="modal-title">Fund Wallet</h4>
                    </div>
                    <div className="modal-body">
                        <p>Enter amount you want to fund.</p>
                        <form onSubmit={handleFundWallet}>
                            <div className="form-group">
                                <label>Amount:</label><br />
                                <input value={amount} type="text" className="form-control" placeholder="Eg: 30000" onChange={(e)=> {
                                    setAmount(e.target.value)
                                }}/>
                            </div>
                        
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={() => setShowModal(false)}>Close</button>
                        <input type="submit" name="fund" className="btn btn-primary" value="Fund" />
                        </div> 
                        </form>
                    </div>
                    </div>

                </div>
                </div>



            </Modal>



            <div className="row">
                <div className="col-lg-6">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <i className="fa fa-bar-chart-o fa-fw"></i> Test Cards
                        </div>
                        <div className="panel-body">
                            <p>Use the below <b>Test Cards</b> to test the application and fund your wallet.</p>
                            <p>
                                Test Mastercard PIN authentication<br />
                                5399 8383 8383 8381<br />
                                cvv 470<br />
                                Expiry: 10/22<br />
                                Pin 3310<br />
                                otp 12345<br />
                            </p>
                            <hr />
                            <p>
                                Test Noauth Visa Card<br />
                                4751763236699647<br />
                                Expiry: 09/21<br />
                            </p>
                            <hr />
                            <p>
                                Test Noauth VisaCard<br />
                                4242 4242 4242 4242<br />
                                cvv: 812<br />
                                Expiry: 01/19<br />
                                Pin 3310<br />
                                otp 12345<br />
                            </p>
                            <hr />
                            <p>
                                Test Verve Card<br />
                                5061460410120223210<br />
                                Expiry Month 12<br />
                                Expiry Year 21<br />
                                cvv: 780<br />
                                Pin: 3310<br />
                                otp 12345<br />
                            </p>
                            <hr />
                            <p>
                                Test VisaCard (Local)<br />
                                4187427415564246<br />
                                cvv: 828<br />
                                Expiry: 09/19<br />
                                Pin 3310<br />
                                otp 12345<br />
                            </p>
                            <hr />
                            <p>
                                Test VisaCard (International)<br />
                                4556052704172643<br />
                                cvv: 899<br />
                                Expiry: 01/19<br />
                            </p>
                            <hr />
                            <p>
                                Test American Express Card (International)<br />
                                344173993556638<br />
                                cvv: 828<br />
                                Expiry: 01/22<br />
                            </p>
                            <hr />
                            <p>
                                Test card Declined<br />
                                5143010522339965<br />
                                cvv 276<br />
                                Expiry: 08/19<br />
                                Pin 3310<br />
                            </p>
                            <hr />
                            <p>
                                Test Card Fraudulent<br />
                                5590131743294314<br />
                                cvv 887<br />
                                Expiry: 11/20<br />
                                Pin 3310<br />
                                otp 12345<br />
                            </p>
                            <hr />
                            <p>
                                Test Card Insufficient Funds<br />
                                5258585922666506<br />
                                cvv 883<br />
                                Expiry: 09/19<br />
                                Pin 3310<br />
                                otp 12345<br />
                            </p>
                            <hr />
                            <p>
                                Pre-authorization Test Card<br />
                                5840406187553286<br />
                                cvv 116<br />
                                Expiry: 09/19<br />
                                Pin 1111<br />
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <i className="fa fa-bar-chart-o fa-fw"></i> Test Acounts
                        </div>
                        <div className="panel-body">
                            <p>Use the below <b>Test Accounts</b> to test the application and fund your wallet.</p>
                            <p>
                                Access Bank<br />
                                Account number: 0690000031<br />
                                otp: 12345
                            </p>
                            <hr />
                            <p>
                                Providus Bank<br />
                                Account number: 5900102340, 5900002567<br />
                                otp: 12345<br />
                            </p>
                            <hr />
                            <p>
                                Sterling Bank<br />
                                Account number: 0061333471<br />
                                otp: 12345
                            </p>
                        </div>
                    </div>
                </div>
            </div>










          
        </div>
    
    );
}
 
export default App;