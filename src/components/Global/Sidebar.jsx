import axios from 'axios';
import React from 'react'
import {Link, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

const Sidebar = () => {
    const navigate = useNavigate(); 
    const Token = localStorage.getItem('token');
    const yesLogout = async() => {
        await axios.delete('http://localhost:5000/logout', {
            headers: {
                Authorization: `Bearer ${Token}`
            },
        }).then(res => {
            localStorage.removeItem('token');
        });
    }

    const Logout = async(e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Do you want to Logout?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes!',
            denyButtonText: `No`,
        }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                {yesLogout()};
                Swal.fire({
                    icon: 'success',
                    text: 'Success Logout!',
                    timer: 1500,
                    showConfirmButton: false,
                }).then(function() {
                    navigate('/');
                })
            } 
        })
    }

    return (
        <aside id="leftsidebar" className="sidebar">
            <div className="navbar-brand">
                <button className="btn-menu ls-toggle-btn" type="button"><i className="zmdi zmdi-menu" /></button>
                <a href="index.html"><img src="/assets/images/logo.svg" width={25} alt="Aero" /><span className="m-l-10">Aero</span></a>
            </div>
            <div className="menu">
                <ul className="list">
                <li>
                    <div className="user-info">
                    <a className="image" href="profile.html"><img src="/assets/images/profile_av.jpg" alt="User" /></a>
                    <div className="detail">
                        <h4>Michael</h4>
                        <small>Super Admin</small>                        
                    </div>
                    </div>
                </li>
                <li className="active open"><Link to ={`/dashboard`}><i className="zmdi zmdi-home" /><span>Dashboard</span></Link></li>
                <li><Link to ={`../employee`}><i className="zmdi zmdi-account" /><span>Data Employee</span></Link></li>
                <li><Link to ={`../users`}><i className="zmdi zmdi-account" /><span>Data User</span></Link></li>
                <li><Link to ={`../category`}><i className="zmdi zmdi-inbox" /><span>Category</span></Link></li>
                <li><Link to ={`../produk`}><i className="zmdi zmdi-inbox" /><span>Produk</span></Link></li>
                <li><Link to={`..`} onClick={Logout}><i className="zmdi zmdi-account" /><span>Logout</span></Link></li>
                <li><a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-apps" /><span>App</span></a>
                    <ul className="ml-menu">
                    <li><a href="mail-inbox.html">Email</a></li>
                    <li><a href="chat.html">Chat Apps</a></li>
                    <li><a href="events.html">Calendar</a></li>
                    <li><a href="contact.html">Contact</a></li>                    
                    </ul>
                </li>
                <li> <a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-assignment" /><span>Projects</span></a>
                    <ul className="ml-menu">
                    <li><a href="project-list.html">Projects List</a></li>
                    <li><a href="taskboard.html">Taskboard</a></li>
                    <li><a href="ticket-list.html">Ticket List</a></li>
                    <li><a href="ticket-detail.html">Ticket Detail</a></li>
                    </ul>
                </li>
                <li> <a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-folder" /><span>File Manager</span></a>
                    <ul className="ml-menu">
                    <li><a href="file-dashboard.html">All File</a></li>
                    <li><a href="file-documents.html">Documents</a></li>
                    <li><a href="file-images.html">Images</a></li>
                    <li><a href="file-media.html">Media</a></li>
                    </ul>
                </li>
                <li> <a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-blogger" /><span>Blog</span></a>
                    <ul className="ml-menu">
                    <li><a href="blog-dashboard.html">Dashboard</a></li>
                    <li><a href="blog-post.html">Blog Post</a></li>
                    <li><a href="blog-list.html">List View</a></li>
                    <li><a href="blog-grid.html">Grid View</a></li>
                    <li><a href="blog-details.html">Blog Details</a></li>
                    </ul>
                </li>
                <li><a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-shopping-cart" /><span>Ecommerce</span></a>
                    <ul className="ml-menu">
                    <li><a href="ec-dashboard.html">Dashboard</a></li>
                    <li><a href="ec-product.html">Product</a></li>
                    <li><a href="ec-product-List.html">Product List</a></li>
                    <li><a href="ec-product-detail.html">Product detail</a></li>
                    </ul>
                </li>
                <li><a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-swap-alt" /><span>Components</span></a>
                    <ul className="ml-menu">
                    <li><a href="ui_kit.html">Aero UI KIT</a></li>                    
                    <li><a href="alerts.html">Alerts</a></li>                    
                    <li><a href="collapse.html">Collapse</a></li>
                    <li><a href="colors.html">Colors</a></li>
                    <li><a href="dialogs.html">Dialogs</a></li>                    
                    <li><a href="list-group.html">List Group</a></li>
                    <li><a href="media-object.html">Media Object</a></li>
                    <li><a href="modals.html">Modals</a></li>
                    <li><a href="notifications.html">Notifications</a></li>                    
                    <li><a href="progressbars.html">Progress Bars</a></li>
                    <li><a href="range-sliders.html">Range Sliders</a></li>
                    <li><a href="sortable-nestable.html">Sortable &amp; Nestable</a></li>
                    <li><a href="tabs.html">Tabs</a></li>
                    <li><a href="waves.html">Waves</a></li>
                    </ul>
                </li>
                <li><a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-flower" /><span>Font Icons</span></a>
                    <ul className="ml-menu">
                    <li><a href="icons.html">Material Icons</a></li>
                    <li><a href="icons-themify.html">Themify Icons</a></li>
                    <li><a href="icons-weather.html">Weather Icons</a></li>
                    </ul>
                </li>
                <li><a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-assignment" /><span>Forms</span></a>
                    <ul className="ml-menu">
                    <li><a href="basic-form-elements.html">Basic Form</a></li>
                    <li><a href="advanced-form-elements.html">Advanced Form</a></li>
                    <li><a href="form-examples.html">Form Examples</a></li>
                    <li><a href="form-validation.html">Form Validation</a></li>
                    <li><a href="form-wizard.html">Form Wizard</a></li>
                    <li><a href="form-editors.html">Editors</a></li>
                    <li><a href="form-upload.html">File Upload</a></li>
                    <li><a href="form-summernote.html">Summernote</a></li>
                    </ul>
                </li>
                <li><a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-grid" /><span>Tables</span></a>
                    <ul className="ml-menu">
                    <li><a href="normal-tables.html">Normal Tables</a></li>
                    <li><a href="jquery-datatable.html">Jquery Datatables</a></li>
                    <li><a href="editable-table.html">Editable Tables</a></li>
                    <li><a href="footable.html">Foo Tables</a></li>
                    <li><a href="table-color.html">Tables Color</a></li>
                    </ul>
                </li>            
                <li><a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-chart" /><span>Charts</span></a>
                    <ul className="ml-menu">
                    <li><a href="echarts.html">E Chart</a></li>
                    <li><a href="c3.html">C3 Chart</a></li>
                    <li><a href="morris.html">Morris</a></li>
                    <li><a href="flot.html">Flot</a></li>
                    <li><a href="chartjs.html">ChartJS</a></li>
                    <li><a href="sparkline.html">Sparkline</a></li>
                    <li><a href="jquery-knob.html">Jquery Knob</a></li>
                    </ul>
                </li>            
                <li><a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-delicious" /><span>Widgets</span></a>
                    <ul className="ml-menu">
                    <li><a href="widgets-app.html">Apps Widgets</a></li>
                    <li><a href="widgets-data.html">Data Widgets</a></li>
                    </ul>
                </li>
                <li><a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-lock" /><span>Authentication</span></a>
                    <ul className="ml-menu">
                    <li><a href="sign-in.html">Sign In</a></li>
                    <li><a href="sign-up.html">Sign Up</a></li>
                    <li><a href="forgot-password.html">Forgot Password</a></li>
                    <li><a href="404.html">Page 404</a></li>
                    <li><a href="500.html">Page 500</a></li>
                    <li><a href="page-offline.html">Page Offline</a></li>
                    <li><a href="locked.html">Locked Screen</a></li>
                    </ul>
                </li>
                <li><a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-copy" /><span>Sample Pages</span></a>
                    <ul className="ml-menu">
                    <li><a href="blank.html">Blank Page</a></li>
                    <li><a href="image-gallery.html">Image Gallery</a></li>
                    <li><a href="profile.html">Profile</a></li>
                    <li><a href="timeline.html">Timeline</a></li>
                    <li><a href="pricing.html">Pricing</a></li>
                    <li><a href="invoices.html">Invoices</a></li>
                    <li><a href="invoices-list.html">Invoices List</a></li>
                    <li><a href="search-results.html">Search Results</a></li>
                    </ul>
                </li>
                <li className="open_top"><a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-map" /><span>Maps</span></a>
                    <ul className="ml-menu">
                    <li><a href="google.html">Google Map</a></li>
                    <li><a href="yandex.html">YandexMap</a></li>
                    <li><a href="jvectormap.html">jVectorMap</a></li>
                    </ul>
                </li>
                <li>
                    <div className="progress-container progress-primary m-t-10">
                    <span className="progress-badge">Traffic this Month</span>
                    <div className="progress">
                        <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow={67} aria-valuemin={0} aria-valuemax={100} style={{width: '67%'}}>
                        <span className="progress-value">67%</span>
                        </div>
                    </div>
                    </div>
                    <div className="progress-container progress-info">
                    <span className="progress-badge">Server Load</span>
                    <div className="progress">
                        <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow={86} aria-valuemin={0} aria-valuemax={100} style={{width: '86%'}}>
                        <span className="progress-value">86%</span>
                        </div>
                    </div>
                    </div>
                </li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar;
