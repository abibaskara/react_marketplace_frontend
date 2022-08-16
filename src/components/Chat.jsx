import React, {useState} from 'react';
import axios from 'axios';


function Chat() {
    
  return (
    <div>
        <section className="content">
            <div className="body_scroll">
                <div className="block-header">
                    <div className="row">
                        <div className="col-lg-7 col-md-6 col-sm-12">
                            <h2>Chat</h2>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home" /> Aero</a></li>
                                <li className="breadcrumb-item"><a href="javascript:void(0);">App</a></li>
                                <li className="breadcrumb-item active">Chat</li>
                            </ul>
                            <button className="btn btn-primary btn-icon mobile_menu" type="button"><i className="zmdi zmdi-sort-amount-desc" /></button>
                        </div>
                        <div className="col-lg-5 col-md-6 col-sm-12">                
                            <button className="btn btn-primary btn-icon float-right right_icon_toggle_btn" type="button"><i className="zmdi zmdi-arrow-right" /></button>                                
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="chat_list">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="zmdi zmdi-search" /></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Search..." required />
                                    </div>
                                    <ul className="user_list list-unstyled mb-0 mt-3">
                                        <li>
                                        <a href="javascript:void(0);">
                                            <img src="assets/images/xs/avatar1.jpg" alt="avatar" />
                                            <div className="about">
                                            <div className="name">Vincent Porter</div>
                                            <div className="status offline"> <i className="zmdi zmdi-circle" /> left 7 mins ago </div>
                                            </div>
                                        </a>
                                        </li>
                                        <li className="active">
                                        <a href="javascript:void(0);">
                                            <img src="assets/images/xs/avatar2.jpg" alt="avatar" />
                                            <div className="about">
                                            <div className="name">Aiden Chavez</div>
                                            <div className="status me"> <i className="zmdi zmdi-circle" /> online </div>
                                            </div>
                                        </a>
                                        </li>
                                        <li>
                                        <a href="javascript:void(0);">
                                            <img src="assets/images/xs/avatar3.jpg" alt="avatar" />
                                            <div className="about">
                                            <div className="name">Mike Thomas</div>
                                            <div className="status online"> <i className="zmdi zmdi-circle" /> online </div>
                                            </div>
                                        </a>
                                        </li>
                                        <li>
                                        <a href="javascript:void(0);">
                                            <img src="assets/images/xs/avatar4.jpg" alt="avatar" />
                                            <div className="about">
                                            <div className="name">Erica Hughes</div>
                                            <div className="status online"> <i className="zmdi zmdi-circle" /> online </div>
                                            </div>
                                        </a>
                                        </li>
                                        <li>
                                        <a href="javascript:void(0);">
                                            <img src="assets/images/xs/avatar5.jpg" alt="avatar" />
                                            <div className="about">
                                            <div className="name">Ginger Johnston</div>
                                            <div className="status online"> <i className="zmdi zmdi-circle" /> online </div>
                                            </div>
                                        </a>
                                        </li>
                                        <li>
                                        <a href="javascript:void(0);">
                                            <img src="assets/images/xs/avatar6.jpg" alt="avatar" />
                                            <div className="about">
                                            <div className="name">Tracy Carpenter</div>
                                            <div className="status offline"> <i className="zmdi zmdi-circle" /> left 30 mins ago </div>
                                            </div>
                                        </a>
                                        </li>
                                        <li>
                                        <a href="javascript:void(0);">
                                            <img src="assets/images/xs/avatar7.jpg" alt="avatar" />
                                            <div className="about">
                                            <div className="name">Christian Kelly</div>
                                            <div className="status offline"> <i className="zmdi zmdi-circle" /> left 10 hours ago </div>
                                            </div>
                                        </a>
                                        </li>
                                        <li>
                                        <a href="javascript:void(0);">
                                            <img src="assets/images/xs/avatar8.jpg" alt="avatar" />
                                            <div className="about">
                                            <div className="name">Monica Ward</div>
                                            <div className="status online"><i className="zmdi zmdi-circle" /> online</div>
                                            </div>
                                        </a>
                                        </li>
                                        <li>
                                        <a href="javascript:void(0);">
                                            <img src="assets/images/xs/avatar9.jpg" alt="avatar" />
                                            <div className="about">
                                            <div className="name">Dean Henry</div>
                                            <div className="status offline"><i className="zmdi zmdi-circle" /> offline since Oct 28</div>
                                            </div>
                                        </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="chat_window body">
                                <div className="chat-header">
                                    <div className="user">
                                    <img src="assets/images/xs/avatar2.jpg" alt="avatar" />
                                    <div className="chat-about">
                                        <div className="chat-with">Aiden Chavez</div>
                                        <div className="chat-num-messages">already 8 messages</div>
                                    </div>
                                    </div>
                                    <div className="setting">
                                    <a href="javascript:void(0);" className="btn btn-sm btn-warning"><i className="zmdi zmdi-camera" /></a>
                                    <a href="javascript:void(0);" className="btn btn-sm btn-info"><i className="zmdi zmdi-file-text" /></a>
                                    </div>
                                    <a href="javascript:void(0);" className="list_btn btn btn-info btn-round float-md-right"><i className="zmdi zmdi-comments" /></a>
                                </div>
                                <hr />
                                <ul className="chat-history">
                                    <li className="clearfix">
                                    <div className="status online message-data text-right">
                                        <span className="time">10:10 AM, Today</span>
                                        <span className="name">Michael</span>
                                        <i className="zmdi zmdi-circle me" />
                                    </div>
                                    <div className="message other-message float-right"> Hi Aiden, how are you? How is the project coming along? </div>
                                    </li>
                                    <li>
                                    <div className="status message-data">
                                        <span className="name">Aiden</span>
                                        <span className="time">10:12 AM, Today</span>
                                    </div>
                                    <div className="message my-message">
                                        <p>Are we meeting today? Project has been already finished and I have results to show you.</p>
                                        <div className="attachment">
                                        <a className="w200" href="javascript:void(0);"><img src="assets/images/image-gallery/2.jpg" alt className="img-fluid img-thumbnail" /></a>
                                        <a className="w200" href="javascript:void(0);"><img src="assets/images/image-gallery/5.jpg" alt className="img-fluid img-thumbnail" /></a>
                                        </div>
                                    </div>
                                    </li>                        
                                    <li>
                                    <div className="status message-data">
                                        <span className="name">Aiden</span>
                                        <span className="time">10:31 AM, Today</span>
                                    </div>
                                    <i className="zmdi zmdi-circle" style={{color: '#04BE5B', fontSize: 10}} />
                                    <i className="zmdi zmdi-circle" style={{color: '#83d0a7', fontSize: 10}} />
                                    <i className="zmdi zmdi-circle" style={{color: '#DAE9DA', fontSize: 10}} />
                                    </li>
                                </ul>
                                <form>
                                    <div className="chat-box">
                                        <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="zmdi zmdi-mail-send" /></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Enter text here..." required />
                                        </div>                                                            
                                    </div>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Chat