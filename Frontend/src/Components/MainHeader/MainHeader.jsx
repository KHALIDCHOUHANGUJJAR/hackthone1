/* eslint-disable react/jsx-key */
import { NavLink } from "react-router-dom";
import { MainHeaderData } from "./MainHeaderData";

const MainHeader = () => {
  return (
    <div className="h-[100px] box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;">
      <div className="h-[100px] w-[90%] m-auto flex justify-between items-center">
        <NavLink to="/">
          <h2 className="text-3xl font-bold uppercase text-green-600">
            {" "}
            Sylani microfinance
          </h2>
        </NavLink>

        <ul className="flex justify-center items-center gap-6">
          {MainHeaderData.map((item, index) => {
            return (
              <li>
                <NavLink
                  key={index}
                  className="text-gray-500 text-[16px] font-semibold"
                  to={item.path}
                >
                  {item.text}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MainHeader;
