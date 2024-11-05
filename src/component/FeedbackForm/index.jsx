import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import Axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css';

const FeedbackForm = ({ user }) => {
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);
    const { productId } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiurl = "http://localhost:8080/api/feedback/taofeedback/" + user.id + "/" + productId;
        console.log(apiurl);
        const res = await Axios.post(apiurl,
            {
                noiDung: feedback,
                soSao: rating,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            }
        );
        if (res.status == 200) {
            alert("Gửi feedback thành công")
        }
        else {
            alert("có lỗi xảy ra")
        }
        // console.log({ feedback, rating });

        // You can add your submission logic here
    };

    return (
        <div className="mx-auto bg-white shadow-md rounded-lg p-6">
            <form onSubmit={handleSubmit}>
                <div className="">
                    <label htmlFor="feedback" className="block text-gray-700 font-medium mb-2">Phản hồi của bạn</label>
                    <textarea
                        id="feedback"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Rating</label>
                    <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className={`w-10 h-10 rounded-full border flex items-center justify-center ${rating >= star ? 'bg-yellow-400' : 'bg-gray-300'} focus:outline-none`}
                                onClick={() => setRating(star)}
                            >
                                <i className={`fas fa-star ${rating >= star ? 'text-yellow-600' : 'text-gray-400'}`}></i>
                            </button>
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FeedbackForm;
