import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiFillDelete } from 'react-icons/ai';

function GeneratePromoCode() {
    const [discountPercent, setDiscountPercent] = useState({
        amount: '',
        expiresAt: '',
        code: '',
        usageLimit: '',
    });
    const [allPromoCode, setAllPromoCode] = useState([]);

    useEffect(() => {
        fetch(https://error-ten.vercel.app/api/v1/courses/course/getAllPromoCode, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setAllPromoCode(data.promeCode);
                } else {
                    toast.error('something went wrong');
                }
            });
    }, []);

    console.log('allPromoCode', JSON.stringify({ discountPercent }));

    const generatePromoCode = () => {
        if (
            discountPercent.amount === '' || discountPercent.expiresAt === '' || discountPercent.code === '') {
            return toast.error('Please fill in the all input fields');
        }
        console.log(discountPercent)
        fetch(https://error-ten.vercel.app/api/v1/courses/course/generate-discount-code, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(discountPercent),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    console.log(data.discountCode.code);
                    toast.success('Generated Promo code successFully');
                    setDiscountPercent({
                        amount: '',
                        expiresAt: '',
                        code: '',
                        usageLimit: '',
                    });
                } else {
                    toast.error('something went wrong');
                }
            });
    };

    const handleDelete = (id) => {
        fetch(https://error-ten.vercel.app/api/v1/courses/course/delete-discount-code/${id}, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Parsed JSON data:', data);
                if (data.success) {
                    toast.success('Promo code deleted');
                    setAllPromoCode(allPromoCode.filter((code) => code._id !== id));
                } else {
                    toast.error('Something was wrong');
                }
            })
            .catch((error) => {
                console.error('There was a problem with the delete operation:', error);
            });
    };
    return (
        <div className="my-5">
            <div data-aos="fade-right" class="row my-5">
                <h3 class="fs-4 mb-3">All Active Courses</h3>
                <div class="col">
                    <div className="overflow-auto mx-5">
                        <input
                            type="number"
                            placeholder="Enter discount percentage"
                            className="inputFlied my-3 mr-3"
                            onChange={(e) => setDiscountPercent({ ...discountPercent, amount: e.target.value })}
                        />
                        <input
                            type="date"
                            placeholder="Enter Expiry Date"
                            className="inputFlied my-3 mr-3"
                            onChange={(e) => setDiscountPercent({ ...discountPercent, expiresAt: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Enter validity Limit / Number of uses"
                            className="inputFlied my-3 mr-3"
                            onChange={(e) => setDiscountPercent({ ...discountPercent, usageLimit: e.target.value })}
                        />
                        <input
                            type="any"
                            placeholder="Enter your discount code"
                            className="inputFlied my-3 mr-3"
                            onChange={(e) => setDiscountPercent({ ...discountPercent, code: e.target.value })}
                        />
                        <button
                            className="btn btn-warning"
                            onClick={generatePromoCode}
                        >
                            GeneratePromoCode
                        </button>
                        <table class="table bg-white rounded shadow-sm  table-hover">
                            <thead>
                                <tr>

                                    <th scope="col">Number of uses</th>
                                    <th scope="col">Discount Percent</th>
                                    <th scope="col">Discount Coupon code</th>
                                    <th scope="col">Delete</th>
                                    

                                </tr>

                                {allPromoCode?.map((item) => (
                                    <tr>
                                        <td>{item.usageLimit}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.code}</td>
                                        <td >   <AiFillDelete onClick={() => handleDelete(item._id)} /></td>
                                    </tr>

                                ))

                                }

                            </thead>
                            <tbody>


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>


    )


export default GeneratePromoCode
error-ten.vercel.app