import { Link } from "react-router-dom";
const Breadcrumb = ({ title }) => {
  const breadcrumbs = title.split("/");
  // console.log("bread", breadcrumbs);

  return (
    <nav aria-label="Breadcrumb" className=" border-b">
      <ol className="breadcrumb max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center">
        <li className="breadcrumb-item">
          <Link to="/" className="text-gray-700">
            Trang chủ
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="breadcrumb-item">
            <span className="text-gray-500 mx-1"></span>
            <Link to={breadcrumb.link} className="text-gray-700">
              {breadcrumb}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};
export default Breadcrumb;