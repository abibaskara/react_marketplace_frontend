import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import '../../paginate.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CategoryList = () => {
  const [categorys, setCategorys] = useState([]);

  const Token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
      getCategory();
  }, []);

  const getCategory = async () => {
    if(!Token) {
      navigate('/');
    } else {
      const response = await axios.get('http://localhost:5000/category', {
        headers: {
          Authorization: `Bearer ${Token}`
        }
      });
      setCategorys(response.data);
    }
  }

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(categorys.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(categorys.length / itemsPerPage));
  }, [itemOffset, itemsPerPage,categorys]);

  const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % categorys.length;
      setItemOffset(newOffset);
  };

  const deleteCategory = async(id) => {
    try {
      Swal.fire({
        icon: 'info',
        title: 'Do you want to delete this category?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Yes!',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
            {yesDelete(id)};
            Swal.fire('Success Delete Category!', '', 'success');
        } 
      })
    } catch (error) {
      console.log(error);
    }
  }

  const yesDelete = async(value) => {
    await axios.delete(`http://localhost:5000/category/${value}`, {
        headers: {
            Authorization: `Bearer ${Token}`
        }
    });
    getCategory();
  } 

  return (
    <div>
        <section className="content">
        <div className="body_scroll">
            <div className="block-header">
            <div className="row">
                <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>Data Category</h2>
                <ul className="breadcrumb">
                    <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home" /> Dashboard</a></li>
                    <li className="breadcrumb-item active">Data Category</li>
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
                    <h2><strong>Data</strong> Category</h2>
                    </div>
                    <div className="body">
                    <h5>Data Category <Link to={'addCategory'} className="btn btn-success btn-sm" style={{float:"right"}}>Add Category</Link></h5>
                        <table className='table is-striped is-fullwidth mt-2'>
                            <thead>
                                <tr>
                                    <th style={{textAlign:'center'}}>No</th>
                                    <th style={{textAlign:'center'}}>Name Category</th>
                                    <th style={{textAlign:'center'}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { categorys.length > 0 ? 
                                currentItems.map((categorys, index) => (
                                  <tr key={categorys.id_category}>
                                  <td style={{textAlign:'center'}}>{index+ 1}</td>
                                  <td style={{textAlign:'center'}}>{categorys.name_category}</td>
                                  <td>
                                      <Link to={`editCategory/${categorys.id_category}`} className='button is-small is-info'>Edit</Link>
                                      <button onClick={() => deleteCategory(categorys.id_category)} className='button is-small is-danger'>Delete</button>
                                  </td>
                              </tr>
                              )) : 
                              <tr>
                                <td colSpan={3} style={{textAlign:'center'}}>Tidak Ada Data Category</td>
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

export default CategoryList