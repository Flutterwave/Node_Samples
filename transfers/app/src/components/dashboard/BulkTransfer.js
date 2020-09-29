import React, {useState} from 'react';
import Modal from 'react-animated-modal'

const App = () => {
  const [showModal, setShowModal] = useState(false)
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

                      <form>
                    <div className="modal-body">
                    <p>Create a transfer group.</p>
                        <div className="form-group">
                            <label>Group Name:</label><br />
                            <input type="text" className="form-control" name="gname" placeholder="Enter group name" />
                        </div>
                        <div className="form-group">
                            <label>Group Description:</label><br />
                            <textarea className="form-control" name="gdesc" placeholder="Enter group description"></textarea>
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
                            
                            <p>No group created.</p>
                        </div>
                    </div>
                </div>
            </div>





            </div>
           




        </div>
    
    );
}
 
export default App;