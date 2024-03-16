import React from 'react'
import { Link } from 'react-router-dom'
import { Banner } from 'payload/components'

const BeforeDashboard = () => {
  return (
    <div>
      {/* <Banner type="success"> */}
        <h2><b>Mattarazi Uomo's Dashboard</b></h2>
      {/* </Banner> */}
      {/* How to Use:
      <ul >
        <li>
          <b>{" Create a new product: "}</b> 
          <span>
            {" Under Collections, click on the '+' under Products | or click "}
            <Link to="/admin/collections/products">here</Link>
          </span>
        </li>
      </ul> */}
    </div>
  )
}

export default BeforeDashboard
