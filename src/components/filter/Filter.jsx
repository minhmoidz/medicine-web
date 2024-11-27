import React, { useState } from "react";
import "./filter.scss";

const Filter = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("Tất cả");
  const [selectedForm, setSelectedForm] = useState("Tất cả");

  const brands = ["Tất cả", "Dhg", "Stella Pharm", "Domesco", "Hasan", "Khapharco"];
  const forms = ["Tất cả", "Viên nén bao phim", "Viên nén", "Viên nang cứng"];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onFilterChange({ searchTerm: e.target.value, selectedBrand, selectedForm });
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    onFilterChange({ searchTerm, selectedBrand: e.target.value, selectedForm });
  };

  const handleFormChange = (e) => {
    setSelectedForm(e.target.value);
    onFilterChange({ searchTerm, selectedBrand, selectedForm: e.target.value });
  };

  return (
    <div className="filter">
      <h2 className="filterTitle">Bộ lọc nâng cao</h2>

      {/* Tìm kiếm */}
      <div className="filterGroup">
        <label htmlFor="search" className="filterLabel">Tìm theo tên</label>
        <input
          type="text"
          id="search"
          className="filterInput"
          placeholder="Nhập tên thuốc..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Thương hiệu */}
      <div className="filterGroup">
        <label htmlFor="brand" className="filterLabel">Thương hiệu</label>
        <select
          id="brand"
          className="filterSelect"
          value={selectedBrand}
          onChange={handleBrandChange}
        >
          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Dạng bào chế */}
      <div className="filterGroup">
        <label htmlFor="form" className="filterLabel">Dạng bào chế</label>
        <select
          id="form"
          className="filterSelect"
          value={selectedForm}
          onChange={handleFormChange}
        >
          {forms.map((form, index) => (
            <option key={index} value={form}>
              {form}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
