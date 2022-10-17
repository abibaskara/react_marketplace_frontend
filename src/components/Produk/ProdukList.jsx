import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../paginate.css';
import ReactPaginate from 'react-paginate';

const ProdukList = () => {
    const [produk, setProduk] = useState([]);
    const Token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        if(!Token) {
            navigate('/');
        } else {
            const response = await axios.get('http://localhost:5000/produk', {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            });
            setProduk(response.data);
            console.log(produk)
        }
    }

    const yesDelete = async(value) => {
        await axios.delete(`http://localhost:5000/produk/${value}`, {
            headers: {
                Authorization: `Bearer ${Token}`
            }
        });
        getUsers();
    } 

    const deleteProduk = async (id) => {
        try{
            Swal.fire({
                icon: 'info',
                title: 'Do you want to delete this produk?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Yes!',
                denyButtonText: `No`,
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    {yesDelete(id)};
                    Swal.fire('Success delete produk!', '', 'success');
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
        setCurrentItems(produk.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(produk.length / itemsPerPage));
    }, [itemOffset, itemsPerPage,produk]);
    
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % produk.length;
        setItemOffset(newOffset);
    };


    return (
        <div>
            <section className="content">
                <div className="body_scroll">
                    <div className="block-header">
                    <div className="row">
                        <div className="col-lg-7 col-md-6 col-sm-12">
                        <h2>Data Produk</h2>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home" /> Dashboard</a></li>
                            <li className="breadcrumb-item active">Data Produk</li>
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
                            <h2><strong>Data</strong> Produk</h2>
                            </div>
                            <div className="body">
                            <h5>Data Produk <Link to={'addProduk'} className="btn btn-success btn-sm" style={{float:"right"}}>Add Produk</Link></h5>
                                <table className='table is-striped is-fullwidth mt-2'>
                                    <thead>
                                        <tr>
                                            <th style={{textAlign:'center'}}>No</th>
                                            <th style={{textAlign:'center'}}>Name Produk</th>
                                            <th style={{textAlign:'center'}}>Category</th>
                                            <th style={{textAlign:'center'}}>Qty</th>
                                            <th style={{textAlign:'center'}}>Description</th>
                                            <th style={{textAlign:'center'}}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { produk.length > 0 ? 
                                        currentItems.map((produk, index) => (
                                        <tr key={produk.id_produk}>
                                        <td style={{textAlign:'center'}}>{index+ 1}</td>
                                        <td style={{textAlign:'center'}}>{produk.name_produk}</td>
                                        <td style={{textAlign:'center'}}>{produk.Category.name_category}</td>
                                        <td style={{textAlign:'center'}}>{produk.qty}</td>
                                        <td style={{textAlign:'center'}}>
                                            { produk.desc.length < 10 ? produk.desc : `${produk.desc.substring(0, 10)}...` }
                                        </td>
                                        <td>
                                            <Link to={`editProduk/${produk.id_produk}`} className='button is-small is-info'>Edit</Link>
                                            <button onClick={() => deleteProduk(produk.id_produk)} className='button is-small is-danger'>Delete</button>
                                        </td>
                                    </tr>
                                    )) : 
                                    <tr>
                                        <td colSpan={6} style={{textAlign:'center'}}>Tidak Ada Data Produk</td>
                                    </tr>}
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

export default ProdukList