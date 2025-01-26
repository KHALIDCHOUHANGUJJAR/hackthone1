import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { postReq } from "../../Api/axios";
import { toast } from "react-toastify";

const categories = [
  {
    name: "Wedding Loans",
    subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
    maxLoan: 500000,
    loanPeriod: 3,
  },
  {
    name: "Home Construction Loans",
    subcategories: ["Structure", "Finishing", "Loan"],
    maxLoan: 1000000,
    loanPeriod: 5,
  },
  {
    name: "Business Startup Loans",
    subcategories: [
      "Buy Stall",
      "Advance Rent for Shop",
      "Shop Assets",
      "Shop Machinery",
    ],
    maxLoan: 1000000,
    loanPeriod: 5,
  },
  {
    name: "Education Loans",
    subcategories: ["University Fees", "Child Fees Loan"],
    maxLoan: "Based on requirement",
    loanPeriod: 4,
  },
];

const ApplicationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [maxLoan, setMaxLoan] = useState(0);
  const [loanPeriod, setLoanPeriod] = useState(0);
  const [loading, setLoading] = useState(false);

  const categoryChangeHandler = (e) => {
    const categoryName = e.target.value;
    setSelectedCategory(categoryName);
    const selectedCategoryData = categories.find(
      (category) => category.name === categoryName
    );
    if (selectedCategoryData) {
      setSubcategories(selectedCategoryData.subcategories);
      setMaxLoan(selectedCategoryData.maxLoan);
      setLoanPeriod(selectedCategoryData.loanPeriod);
    } else {
      setSubcategories([]);
      setMaxLoan(0);
      setLoanPeriod(0);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await postReq("/auth/add-application-data", data);
      toast.success("Application submitted successfully!");
      reset();
      setSelectedCategory("");
      setSubcategories([]);
      setMaxLoan(0);
      setLoanPeriod(0);
      setLoading(false  );
    } catch (error) {
      toast.error("Error submitting the application. Please try again.");
      console.error("Error submitting application:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg w-full mx-auto mt-10 p-5 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-700">
        Loan Application Form
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            onChange={categoryChangeHandler}
            className="mt-2 block w-full bg-white px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-red-500 text-sm">
              {errors.category.message}
            </span>
          )}
        </div>

        {selectedCategory && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subcategory
            </label>
            <select
              {...register("subCategory", {
                required: "Subcategory is required",
              })}
              className="mt-2 block w-full bg-white px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a Subcategory</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
            {errors.subCategory && (
              <span className="text-red-500 text-sm">
                {errors.subCategory.message}
              </span>
            )}
          </div>
        )}

        {selectedCategory && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Loan Amount (Max:{" "}
              {maxLoan === "Based on requirement" ? maxLoan : `Rs:${maxLoan}`})
            </label>
            <input
              type="number"
              {...register("amount", {
                required: "Amount is required",
                min: { value: 1, message: "Amount must be greater than 0" },
                max: maxLoan !== "Based on requirement" ? maxLoan : undefined,
              })}
              className="mt-2 block w-full bg-white px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter amount"
            />
            {errors.amount && (
              <span className="text-red-500 text-sm">
                {errors.amount.message}
              </span>
            )}
          </div>
        )}

        {loanPeriod > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Loan Period (Years)
            </label>
            <select
              {...register("year", { required: "Loan period is required" })}
              className="mt-2 block w-full bg-white px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Loan Period</option>
              {Array.from({ length: loanPeriod }, (_, index) => index + 1).map(
                (year) => (
                  <option key={year} value={year}>
                    {year} Year{year > 1 ? "s" : ""}
                  </option>
                )
              )}
            </select>
            {errors.year && (
              <span className="text-red-500 text-sm">
                {errors.year.message}
              </span>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              <span className="ml-2">Submitting...</span>
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
