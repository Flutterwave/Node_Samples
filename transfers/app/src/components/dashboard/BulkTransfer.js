import React, {useState, useEffect} from 'react';
import Modal from 'react-animated-modal'
import {getGroups, addGroups} from '../../utils'


const App = () => {
  const [showModal, setShowModal] = useState(false)
  const [groups, setGroups] = useState([])

  const [group, setGroup] = useState({
        gname:"",
        gdesc: ""
  })

  const handleInputChange = (e) => {
    setGroup({
        ...group,
        [e.target.name]: e.target.value
    })
}

const handleSubmit = (e) => {
    e.preventDefault()
    const user = JSON.parse(
        sessionStorage.getItem("userData")
      );
      console.log("requesting")
      addGroups(group, user)

}


  useEffect(() => {
    const fetchGrouos = async() =>  {
        const res = await getGroups()
        setGroups(res)
    }
    fetchGrouos()

},[])

    return (  
        <div id="page-wrapper">
           <div className="row">
                <div className="col-lg-12">
                    <h1 className="page-header">Bulk Transfer</h1>
                </div>

                 <Modal
                  visible={showModal}
                  closemodal={() =>
                    setShowModal(false)
                  }
                  type="zoomIn"
                >
                  <div className="complete-reg-success-modalX  modal-sm">
                      <div className="modal-header">
                        <h4 className="modal-title">Create Transfer Group</h4>
                      </div>

                      <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                    <p>Create a transfer group.</p>
                        <div className="form-group">
                            <label>Group Name:</label><br />
                            <input type="text" className="form-control" onChange={handleInputChange} value={group.gname} name="gname" placeholder="Enter group name" />
                        </div>
                        <div className="form-group">
                            <label>Group Description:</label><br />
                            <textarea className="form-control" onChange={handleInputChange} value={group.gdesc} name="gdesc" placeholder="Enter group description"></textarea>
                        </div>
                    
                        </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={()=> setShowModal(false)}>Close</button>
                        <input type="submit" name="group" className="btn btn-primary" value="Create" />
                    </div>
                    </form>
                    
                  </div>
                 
            </Modal>



                


            <div className="row">
                <div className="col-lg-10">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <i className="fa fa-bar-chart-o fa-fw"></i> Add Groups
                            <button  className="btn btn-sm btn-primary pull-right" onClick={()=> setShowModal(true)}>Add Group</button>
                            <br /><br />
                        </div>
                        <div className="panel-body">
                            {
                                groups.length?(
                                    groups.map(item => (
                                        <div style={{backgroundColor:"#f8f8f8", width: "100%", padding: "20px", marginBottom:"10px"}}>
                                                <h3>{item.groupname}</h3>
                                                <p>{item.groupdesc}</p>
                                                <a href='#' className='btn btn-sm btn-info pull-right'>View</a><br />
                                        </div>
                                    ))
                                ):(
                                    <p>No group created.</p>
                                )
                            }
                            
                           
                        </div>
                    </div>
                </div>
            </div>





            </div>
           




        </div>
    
    );
}
 
export default App;