import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function () {

  const [search, setSearch] =useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodData2, setFoodData2] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5001/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();
    setFoodData2(response[0]);
    setFoodCat(response[1]);
    //console.log(response[0],response[1]);

  }


  useEffect(() => {
    loadData()
  }, [])


  return (
    <div>
      <div><Navbar /></div>
      <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(60%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900x700/?sandwich" className="d-block w-100" style={{ filter: "brightness(60%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" style={{ filter: "brightness(60%)" }} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div></div>
      <div className='container'>
        {
          foodCat !== []
            ? foodCat.map((data) => {
              return (
                <div className='row mb-3'>
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodData2 !== [] ? foodData2.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                  .map(filterItems => {
                    return (
                      <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                        <Card foodItem= {filterItems}
                          options={filterItems.options[0]}
                        ></Card>
                      </div>
                    )
                  }) : <div>No such Data Found</div>}
                </div>
              )
            })
            : ""
        }
      </div>
      <div><footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">

          </Link>
          <span className="text-muted">© 2023 GoFood, Inc</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        </ul>
      </footer></div>

    </div >
  )
}
