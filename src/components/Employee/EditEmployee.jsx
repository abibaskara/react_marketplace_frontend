import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import InputMask from "react-input-mask";

function EditEmployee() {
    const Token = localStorage.getItem('token');
    const Url = 'http://localhost:5000/'
    const {id} = useParams();
    const navigate = useNavigate();

    const [name_employee, setNameEmployee] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        getEmployeeById();
    }, []);

    const getEmployeeById = async() => {
        if(!Token) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You Must Login!',
                time: 1500,
            })
        } else {
            const response = await axios.get(`${Url}employee/${id}`, {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            });

            setNameEmployee(response.data.name_employee);
            setPhone(response.data.phone);
            setAddress(response.data.address);
        }
    }

    const updateEmployee = async(e) => {
        e.preventDefault();
        try {
            await axios.patch(`${Url}employee/${id}`, {
                address: address,
                name_employee: name_employee,
                phone: phone
            }, {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            }).then((result) => {
                if(result.status == 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: result.data.message,
                        timer: 1500,
                        showConfirmButton: false,
                    }).then(function() {
                        navigate('/employee');
                    })
                }
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please Check Server!',
                timer: 1500,
                showConfirmButton: false,
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
                        <h2>Tambah Data Employee</h2>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home" /> Dashboard</a></li>
                            <li className="breadcrumb-item"><Link to={`../employee`}>Data Employee</Link></li>
                            <li className="breadcrumb-item active">Update Data Employee</li>
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
                            <h2><strong>Update</strong> Employee</h2>
                            </div>
                            <div className="body">
                            <h5>Update Data Employee</h5>
                                <form onSubmit={updateEmployee}>
                                    <div className="field">
                                        <label className="label">Name Employee</label>
                                        <div className="control">
                                            <input type="text" className='input' value={name_employee} onChange= {(e) => setNameEmployee(e.target.value)} placeholder='Name Employee' />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Address</label>
                                        <div className="control">
                                            <textarea className='input' value={address} onChange= {(e) => setAddress(e.target.value)} placeholder='Address'>{address}</textarea>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Phone Number</label>
                                        <div className="input-group masked-input mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="zmdi zmdi-smartphone" /></span>
                                            </div>
                                            <InputMask mask="+629 (999) 9999-999" maskChar={'_'} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Ex: +00 (000) 0000-000" className='form-control' />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <button type='submit' className='button is-success'>Simpan</button>
                                        <Link to={'../employee'}><button type='button' className='button is-secondary'>Back</button></Link>
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

export default EditEmployee