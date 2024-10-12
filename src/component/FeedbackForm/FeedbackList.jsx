import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../../website_ban_sach_fe/src/context/UserContext";

import Axios from 'axios';

const FeedbackList = ({ bookId }) => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const res = await Axios.get(`http://localhost:8080/api/feedback/layfeedbacktheosach/${bookId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                setFeedbacks(res.data);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        };

        fetchFeedbacks();
    }, [bookId]);

    return (
        <div className="mx-auto bg-white shadow-md rounded-lg p-4">
            {feedbacks.length > 0 ? (
                feedbacks.map((feedback) => (
                    <div key={feedback.id} className="mb-2 p-2 border rounded-lg">
                        <div className="flex items-center mb-1">
                            <h3 className="text-lg font-bold mr-2">{feedback.tenTaiKhoan}</h3>
                            <div className="flex">
                                {[...Array(5)].map((star, index) => (
                                    <i
                                        key={index}
                                        className={`fas fa-star ${index < feedback.soSao ? 'text-yellow-500' : 'text-gray-300'}`}
                                    ></i>
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-700 text-sm">{feedback.noiDung}</p>
                        <p className="text-gray-500 text-xs mt-1">{new Date(feedback.ngayFeedback).toLocaleDateString()}</p>
                    </div>
                ))
            ) : (
                <p>No feedback available.</p>
            )}
        </div>
    );
};

export default FeedbackList;
