import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import '../paginate.css';
import Swal from 'sweetalert2';

const UserList = () => {
    const [users, setUser] = useState([]);
    const Token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        if(!Token) {
            navigate('/');
        } else {
            const response = await axios.get('http://localhost:5000/users', {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            });
            setUser(response.data);
        }
    }

    const yesDelete = async(value) => {
        await axios.delete(`http://localhost:5000/users/${value}`, {
            headers: {
                Authorization: `Bearer ${Token}`
            }
        });
        getUsers();
    } 

    const deleteUser = async (id) => {
        try{
            Swal.fire({
                icon: 'info',
                title: 'Do you want to delete this user?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Yes!',
                denyButtonText: `No`,
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    {yesDelete(id)};
                    Swal.fire('Success delete user!', '', 'success');
                } 
            })
        } catch(error) {
            console.log(error);
        }
    }

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(users.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(users.length / itemsPerPage));
    }, [itemOffset, itemsPerPage,users]);
    
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % users.length;
        setItemOffset(newOffset);
    };

    return (
        <div>
            <section className="content">
            <div className="body_scroll">
                <div className="block-header">
                <div className="row">
                    <div className="col-lg-7 col-md-6 col-sm-12">
                    <h2>Data user</h2>
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home" /> Dashboard</a></li>
                        <li className="breadcrumb-item active">Data User</li>
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
                        <div className="header">
                        <h2><strong>Data</strong> User</h2>
                        </div>
                        <div className="body">
                        <h5>Data User <Link to ={`addUsers`} className="btn btn-success btn-sm" style={{float:"right"}}>Add User</Link></h5>
                            <table className='table is-striped is-fullwidth mt-2'>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Gender</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((user, index) => (
                                            <tr key={user.id}>
                                            <td>{index+ 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.gender}</td>
                                            <td>
                                                <Link to={`editUsers/${user.id}`} className='button is-small is-info'>Edit</Link>
                                                <button onClick={() => deleteUser(user.id)} className='button is-small is-danger'>Delete</button>
                                            </td>
                                        </tr>
                                        )
                                    )}
                                </tbody>
                            </table>  
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination-pagn"
                pageLinkClassName='page-num-pagn'
                previousLinkClassName='page-num-pagn'
                nextLinkClassName='page-num-pagn'
                activeLinkClassName='active-pagn'
            />
            </section>
        </div>
    )
}

export default UserList
