import React from 'react'
import AdminHeader from "../../components/admin/adminHeader";


export default function AddNewProduct() {
    return (
        <>
            <AdminHeader />
            <div className='AddNewProductContainer'>
                <div className='addNew'>
                    <p>Add New Product</p>
                </div>
                <div className='productBody'>
                    <div className='createproduct'>
                        <h6>Create Product</h6>
                        <label>Product Title</label>
                        <input type="text" placeholder='Product title' required />
                        <p>Do not exceed 20 characters when entering the product name.</p>
                    </div>
                    <div>
                        <label>Product Code</label>
                        <input type="text" value='TWT145015' disabled required/>
                        <p>Code will be generated automatically</p>
                    </div>
                    <div>
                        <label htmlFor="Quantity">Quantity</label>
                        <input type="number" placeholder='Quantity' required />
                    </div>
                    <div>
                        <label htmlFor="SKU">SKU</label>
                        <input type="text" value='TWT-LP-ALU-08' required />
                    </div>
                    <div>
                        <label htmlFor="">Brand</label>
                        <input type="text" placeholder='Brand' required />
                    </div>
                    <div>
                        <label htmlFor="Category">Category</label>
                        <select name="" id="">
                            <option value="">Book</option>
                            <option value="">Men's Fashion</option>
                            <option value="">Women's Fashion</option>
                            <option value="">Grocery</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">Product Type</label>
                        <select name="" id="">
                            <option value="">Boxed</option>
                            <option value="">single</option>
                            <option value="">unit</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">Gender</label>
                        <select name="" id="">
                            <option value="">Men</option>
                            <option value="">Women</option>
                            <option value="">Unisex</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">Color Varient</label>
                        <div className='checkboxcolor'>
                            <div><input type="checkbox" /></div>
                            <div><input type="checkbox" /></div>
                            <div><input type="checkbox" /></div>
                            <div><input type="checkbox" /></div>
                            <div><input type="checkbox" /></div>
                            <div><input type="checkbox" /></div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">Size</label>
                        <div className='checkboxSize'>
                        <div><input type="checkbox" /></div>
                        <div><input type="checkbox" /></div>
                        <div><input type="checkbox" /></div>
                        <div><input type="checkbox" /></div>
                        <div><input type="checkbox" /></div>
                        <div><input type="checkbox" /></div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">Product Image</label>
                    </div>
                </div>
            </div>

        </>
    )
}
