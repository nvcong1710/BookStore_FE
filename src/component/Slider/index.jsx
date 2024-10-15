import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const settings = {
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
const settings2 = {
  infinite: false,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
const AuthorSlider = ({authors}) => {
  return (
    <Slider {...settings2}>
      {authors.map((author) => (
        <div key={author.id} className="flex flex-col items-center px-4">
          <div className="flex flex-col items-center">
             <a href={`/tac-gia/${author.id}`}>
              <img
                // inline-block
                className="flex items-center h-48 w-48 rounded-full ring-2 ring-white object-cover"
                src={
                  author.image
                    ? author.image.includes("/")
                      ? author.image
                      : `http://localhost:8080/tg_image/${author.image}`
                    : "https://bizweb.dktcdn.net/100/363/455/articles/blank-author-33728236-0ca7-4f4e-a265-ddcd14036f53.jpg?v=1705287921247"
                }
                alt={author.tenTacGia}
              />
              <h3 className="mt-2 text-base font-medium text-gray-900">
                {author.tenTacGia}
              </h3>
            </a>
          </div>
        </div>
      ))}
    </Slider>
  );
};

const BookSlider = ({books}) => {
  return (
    <Slider {...settings}>
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          {" "}
          <div className="p-6">
            <a href={"/sach/" + book.id} className="">
              <img
                className="h-80 w-full object-cover"
                alt={book.tieuDe}
                src={
                  book.photoURL
                    ? book.photoURL.includes("/")
                      ? book.photoURL
                      : `http://localhost:8080/sach_image/${book.photoURL}`
                    : "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png"
                }
              />
            </a>
            <a
              href={"/sach/" + book.id}
              className="mt-4 text-lg font-medium text-gray-900"
            >
              {book.tieuDe}
            </a>
            <p className="mt-2 text-md text-blue-500 font-bold">{book.gia}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export { AuthorSlider, BookSlider };
