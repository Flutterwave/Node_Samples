import React, {useState, useEffect} from 'react';
import Modal from 'react-animated-modal'
import {getBanks, addMembers,bulkTransfer, getMembers} from '../../utils'



const App = ({match}) => {
  const [members, setMembers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [banks, setBanks] = useState([])

  const [member, setMember] = useState({
    acctno:"",
    acctname:"",
    salary:"",
    bank: "",
    bankname: "",
})

  const handleInputChange = (e) => {
    setMember({
        ...member,
        [e.target.name]: e.target.value
    })
}

const totalAmount =  members.reduce((acc,item) => acc + Number(item.amount),0)


  const handleBankChange = (e) => {
      const bankAndCode =  e.target.value.split(',')
    setMember({
        ...member,
        bank: bankAndCode[0],
        bankname: bankAndCode[1],
    })
}

const handleSubmit = (e) => {
    e.preventDefault()
    addMembers({...member, groupid: match.params.id })
}

const handlePay = (e) => {
    e.preventDefault()
    const user = JSON.parse(
        sessionStorage.getItem("userData")
      );
      if(Number(totalAmount) > Number(user.walletamount)){
          alert("sorry you do not have enough money in you wallet")
      }else{
          console.log("requesting")
          const reqbody = members.reduce((acc, item) => {
            return [
                ...acc,
                {
                    ...item,
                    referesce: Date.now(),
                    currency: "NGN",
                    narration: "bulk transfer",
                }
            ]
        
        }, [])
        bulkTransfer(reqbody)
      }
    
}

useEffect(() => {
    const fetchBanks = async() =>  {
        const bankRes = await getBanks()
        const resMembers = await getMembers(match.params.id)
            setBanks(bankRes)
            setMembers(resMembers)
    }
    fetchBanks()

},[])

    return ( 
        <div id="page-wrapper">
            <div className="row">
                <div class="col-lg-6">
                    <h1 class="page-header">Bulk Transfer</h1>
                </div>
                <div class="col-lg-4 col-md-6">
                <br/>
                <div class="panel panel-info">
                    <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-money fa-4x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                 <div class="huge">{
                                     totalAmount
                                 }</div>
                                    <div>Total Group Payout</div>
                                </div>
                            </div>
                        </div>
                        <div class="panel-footer">
                            <form onSubmit={handlePay}>
                                <input type="submit" name="pay" value="Click to Pay" class="btn btn-sm btn-warning pull-right" />
                            </form>
                            <div class="clearfix"></div>
                        </div>

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
                <div className="complete-reg-success-modal">
                    <div className="modal-header">
                        <h4 className="modal-title">Add Member</h4>
                      </div>
                    <div class="modal-body">
                     <p>Add member to the group.</p>
                    <form onSubmit={handleSubmit}>
                        <div class="form-group">
                            <label>Bank Name:</label><br />
                            <select class="form-control" onChange={handleBankChange} name="bank">
                                <option value="">--select bank --</option>
                                {banks.map(bank =>  <option key={bank.id} value={`${bank.code},${bank.name}`}>{bank.name}</option>)}

                                
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Account Number:</label><br />
                            <input type="text" name="acctno" onChange={handleInputChange} value={member.acctno} class="form-control" placeholder="0020176171" />
                        </div>
                        <div class="form-group">
                            <label>Account Name:</label><br />
                            <input type="text" name="acctname" onChange={handleInputChange} value={member.acctname} class="form-control" placeholder="John Doe" />
                        </div>
                        <div class="form-group">
                            <label>Salary Amount:</label><br />
                            <input type="text" name="salary" onChange={handleInputChange} value={member.salary} class="form-control" placeholder="Eg: 30000" />
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-default" onClick={()=> setShowModal(false)}>Close</button>
                    <input type="submit" name="add" class="btn btn-primary" value="Add Member" />
                    </div>

                    </form>


                    </div>

                </div>

            </Modal>

            <div class="row">
                <div class="col-lg-10">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <i class="fa fa-bar-chart-o fa-fw"></i> Group Members
                            <button class="btn btn-sm btn-primary pull-right"  onClick={()=> setShowModal(true)}>Add Member</button>
                            <br /><br />
                        </div>

                        <div class="panel-body">
                            <p>NB: For the sake of this API test, we will not be deleting or editing any record. If you stumble on this from my github account, kindly add those features. It is highly recommended. We are skipping those features because this is not a production app.</p>
                            <br />
                            {
                                 members.length?(
                                    <table class='table table-bordered'>
                                
                                    <tr>
                                                <th>S/N</th>
                                                <th>Staff Name</th>
                                                <th>Staff Bank</th>
                                                <th>Staff Account No.</th>
                                                <th>Staff Salary</th>
                                            </tr>
                                            
                                               {
                                                   members.map((item, i) =>  <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{item.staffname}</td>
                                                    <td>{item.bankname}</td>
                                                    <td>{item.staffacctno}</td>
                                                    <td>{item.amount}</td>
                                                    </tr>)
                                               }
                                          
        
        
                                    </table>
                                 ):(<p style={{color: "red"}}>No member in the group.</p>)

                            }
                           
                          
                        </div>

                        


                    </div>

                </div>
            </div>


        </div>
     );
}
 
export default App;