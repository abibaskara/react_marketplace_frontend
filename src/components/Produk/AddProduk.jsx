import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddProduk = () => {
    const [file, setFile] = useState([]);
    const [hasil, setHasil] = useState([
        {file_name: ''}
    ]);

    const tambahRow = (e) => {
        e.preventDefault();
        setHasil([...hasil, {file_name: ''}]);
    }

    const deleteRow = index => {
        const list = [...hasil];
        list.splice(index, 1);
        setHasil(list);
    }

    const handleChange = (e, index) => {
        // const {name, value} = e.target.files[0];
        const image = e.target.files[0];
        const list = [...hasil];
        list[index] = image;
        setFile(list);
        setHasil(list);
    }

    const saveProduk = async(e) => {
        // console.log(preview)
        e.preventDefault();
        try {
            // const count = hasil.length;

            // for(let i=0; i<count; i++) {
            // }
        } catch (error) {
            
        }
    }

    return (
        <div>
            <section className="content">
                <div className="body_scroll">
                    <div className="block-header">
                    <div className="row">
                        <div className="col-lg-7 col-md-6 col-sm-12">
                        <h2>Tambah Data Produk</h2>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home" /> Dashboard</a></li>
                            <li className="breadcrumb-item"><Link to={`../category`}>Data Produk</Link></li>
                            <li className="breadcrumb-item active">Tambah Data Produk</li>
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
                            <h2><strong>Tambah</strong> Produk</h2>
                            </div>
                            <div className="body">
                            <h5>Tambah Data Produk</h5>
                                <form onSubmit={saveProduk}>
                                    <div className="field">
                                        <label className="label">Name Produk</label>
                                        <div className="control">
                                            <input type="text" className='input' placeholder='Name Produk' />
                                        </div>
                                    </div>
                                    <table className='table is-striped is-fullwidth mt-2'>
                                        <thead>
                                            <tr>
                                                <th style={{textAlign:'center'}}>Foto</th>
                                                <th style={{textAlign:'center'}}><button onClick={tambahRow} className='btn btn-primary btn-sm'>+</button></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {hasil.map((item, i) => {
                                                return(
                                                    <tr key={i}>
                                                        <td>
                                                            <input type="file" value={hasil.file_name} onChange={(e) => handleChange(e, i)} className='form-control' />
                                                        </td>
                                                        <td> 
                                                            {
                                                                i == 0 ? '' : <button onClick={() => deleteRow(i)} className='btn btn-danger btn-sm'>Hapus</button>
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table> 

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

export default AddProduk