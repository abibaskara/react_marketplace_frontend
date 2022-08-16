import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';
import ReactPaginate from "react-paginate";
import '../../paginate.css';
import Swal from "sweetalert2";

function EmployeeList() {
    const [employee, setEmployee] = useState([]);
    const Token = localStorage.getItem('token');
    const Url = 'http://localhost:5000/';
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;

    const navigate = useNavigate();

    useEffect(() => {
        getEmployee();
    }, []);

    const getEmployee = async() => {
        if(!Token) {
            Swal.fire({
                icon: 'error',
                text: 'Anda Harus Login Terlebih Dahulu!',
                showConfirmButton: false,
                timer: 1500,
            }).then(function() {
                navigate('/');
            });
        } else {
            const response = await axios.get(`${Url}employee`, {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            });
            setEmployee(response.data);
        }
    }

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(employee.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(employee.length / itemsPerPage));
    }, [itemOffset, itemsPerPage,employee]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % employee.length;
        setItemOffset(newOffset);
    };

    const deleteEmployee = async(id) => {
        try {
            await axios.delete(`${Url}employee/${id}`, {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            }).then((result) => {
                if(result.status == 200){
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: result.data.message,
                        timer: 1500,
                        showConfirmButton: false,
                    }).then(function() {
                        getEmployee();
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Employee Deleted',
                        timer: 1500,
                        showConfirmButton: false
                    })
                }
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please Check Server!',
                timer: 1500,
                showConfirmButton: false
            })
        }
    }

  return (
    <div>
        <section className="content">
        <div className="body_scroll">
            <div className="block-header">
            <div className="row">
                <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>Data Employee</h2>
                <ul className="breadcrumb">
                    <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home" /> Dashboard</a></li>
                    <li className="breadcrumb-item active">Data Employee</li>
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
                    <h2><strong>Data</strong> Employee</h2>
                    </div>
                    <div className="body">
                    <h5>Data Employee <Link to ={`addEmployee`} className="btn btn-success btn-sm" style={{float:"right"}}>Add Employee</Link></h5>
                        <table className='table is-striped is-fullwidth mt-2'>
                            <thead>
                                <tr>
                                    <th style={{textAlign:'center'}}>No</th>
                                    <th style={{textAlign:'center'}}>Name Employee</th>
                                    <th style={{textAlign:'center'}}>Address</th>
                                    <th style={{textAlign:'center'}}>Phone</th>
                                    <th style={{textAlign:'center'}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((employee, index) => (
                                    <tr key={employee.id_employee}>
                                        <td style={{textAlign:'center'}}>{index + 1}</td>
                                        <td>{employee.name_employee}</td>
                                        <td>{employee.address}</td>
                                        <td>{employee.phone}</td>
                                        <td style={{textAlign:'center'}}>
                                            <Link to={`editEmployee/${employee.id_employee}`} className='button is-small is-info'>Edit</Link>
                                            <button onClick={() => deleteEmployee(employee.id_employee)} className="button is-small is-danger ml-2">Hapus</button>
                                        </td>
                                    </tr>
                                ))}
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

export default EmployeeList