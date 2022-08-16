import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddCategory = () => {
    const [name_category, setNameCategory] = useState('');
    const Token = localStorage.getItem('token');
    const navigate = useNavigate();
    const saveCategory = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/category', {
                name_category: name_category
            }, {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            }).then((result) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Category Created',
                    timer: 1500,
                    showConfirmButton: false
                }).then(function() {
                    navigate('../category');
                })
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Check Server!',
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
                        <h2>Tambah Data Category</h2>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home" /> Dashboard</a></li>
                            <li className="breadcrumb-item"><Link to={`../category`}>Data Category</Link></li>
                            <li className="breadcrumb-item active">Tambah Data Category</li>
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
                            <h2><strong>Tambah</strong> Category</h2>
                            </div>
                            <div className="body">
                            <h5>Tambah Data Category</h5>
                                <form onSubmit={saveCategory}>
                                    <div className="field">
                                        <label className="label">Name Category</label>
                                        <div className="control">
                                            <input type="text" value={name_category} onChange={(e) => setNameCategory(e.target.value)} className='input' placeholder='Name Category' />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <button type='submit' className='button is-success'>Simpan</button>
                                        <Link to={'../category'}><button type='button' className='button is-secondary'>Back</button></Link>
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

export default AddCategory