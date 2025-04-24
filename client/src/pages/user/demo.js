import React, { useState } from 'react'

function Demo() {
    const data = [
        {
            title: "Online Booking",
            category: [
                { service: "plumber", id: 1 },
                { service: "electrician", id: 2 },
                { service: "bike taxi", id: 3 },
                { service: "ola", id: 4 },
                { service: "uber", id: 5 }
            ]
        }
        , {
            title: "Other Online Boookings",
            subCategory: [
                { subService: "Zomato", id: 6 },
                { subService: "saravana taxi", id: 7 },
                { subService: "red taxi", id: 8 },
                { subService: "swizzy", id: 9 },
                { subService: "carpenter", id: 10 }
            ]
        }
    ]

    const [array, setArray] = useState([]);

    const handleSubmit = (service, id) => {
        console.log(id);
        if (array.includes(service)) {
            // setArray(serviceItem=>serviceItem.filter(item=>{return item !== service}))
            return null;
        }
        else {
            setArray([...array, service]);
        }
        console.log(array);
    }

    return (
        <div>
            {data.map((item, index) => (
                <div>
                    <div key={index}>
                        <h4>{item.title}</h4>
                    </div>

                    <div>
                        {item.category &&
                            item.category.map((categoryItem, index) => (
                                <button key={index} style={{
                                    margin: "20px",
                                    width: "140px",
                                    padding: "10px"
                                }}
                                    onClick={() => { handleSubmit(categoryItem.service, categoryItem.id) }}
                                >
                                    {categoryItem.service}
                                </button>
                            ))
                        }
                    </div>

                    <div>
                        {item.subCategory &&
                            item.subCategory.map((subCategoryItem, index) => (
                                <button key={index} onClick={() => { handleSubmit(subCategoryItem.subService, subCategoryItem.id) }} style={{ margin: "20px", width: "140px", padding: "10px" }}  >
                                    {subCategoryItem.subService}
                                </button>
                            ))
                        }
                    </div>
                </div>

            ))}


            <div>
                <h4>Selected items are shown below</h4>
                <div style={{ display: "flex", overflowX: "scroll" }}>

                    {array.length > 0 && array.map((data) => (

                        <div style={{
                            width: "140px",
                            margin: "20px",
                            backgroundColor: "lightblue",
                            textAlign: "center",
                        }}>
                            {data}
                        </div>

                    ))}
                </div>
            </div>

        </div>
    )
}

export default Demo;