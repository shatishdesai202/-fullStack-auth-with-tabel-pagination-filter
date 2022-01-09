import React, { useEffect, useState } from "react";
import "./styles.css";

const Home = () => {
  const [tableData, setTableData] = useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [selectedPage, setSelectedPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [rangeData, setRangeData] = useState({ startIndex: 0, endIndex: 20 });

  const [inputValue, setInputValue] = useState("");
  const columns = tableData[0] && Object.keys(tableData[0]);
  const [searchColumns, setSearchColumns] = useState([
    "first_name",
    "last_name",
    "email",
    "phone",
  ]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://localhost:8080/api/mock-data").then(async (resp) => {
        let json = await resp.json();
        if (resp.status === 200) {
          let pageTotal = Math.ceil(json.length / pageSize);
          setTotalPage(pageTotal);
          setTableData(json);
        } else {
          console.log(resp);
        }
      });
    };
    fetchData();
  }, [pageSize]);

  const handlePageChange = (index) => {
    const page = index - 1;
    const range = { startIndex: page * 20, endIndex: (page + 1) * 20 };
    setSelectedPage(index);
    setRangeData(range);
  };

  function search(rows) {
    return tableData
      .slice(rangeData.startIndex, rangeData.endIndex)
      .filter((row) =>
        searchColumns.some(
          (column) =>
            row[column]
              .toString()
              .toLowerCase()
              .indexOf(inputValue.toLowerCase()) > -1
        )
      );
  }

  return (
    <div>
      <div className="container">
        <input
          className="input-box"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search Here..."
        />
        <div className="search-options">
          {columns &&
            columns.map((column, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  checked={searchColumns.includes(column)}
                  onChange={(e) => {
                    const checked = searchColumns.includes(column);
                    setSearchColumns((prev) =>
                      checked
                        ? prev.filter((sc) => sc !== column)
                        : [...prev, column]
                    );
                  }}
                />
                {column}
              </label>
            ))}
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>sr.no</th>
            {columns &&
              columns.map((item, index) => {
                return <th key={index}>{item}</th>;
              })}
          </tr>
        </thead>
        <tbody>
          {search(tableData).length > 0 ? (
            search(tableData).map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item["first_name"]}</td>
                  <td>{item["last_name"]}</td>
                  <td>{item["email"]}</td>
                  <td>{item["phone"]}</td>
                </tr>
              );
            })
          ) : (
            <tr className="error-text">
              <td>No Record Found</td>
            </tr>
          )}
        </tbody>
      </table>
      {totalPage > 1 && (
        <ul className="pagination">
          <button
            disabled={selectedPage <= 1}
            className="pagination-block"
            onClick={() => {
              handlePageChange(selectedPage - 1);
              setInputValue("");
            }}
          >
            &laquo;
          </button>
          {[...Array(totalPage)].map((item, index) => {
            return (
              <li
                key={index}
                className={`pagination-block ${
                  selectedPage === index + 1 && "active-tab"
                }`}
                onClick={() => {
                  handlePageChange(index);
                  setInputValue("");
                }}
              >
                {++index}
              </li>
            );
          })}
          <button
            disabled={selectedPage >= totalPage}
            className="pagination-block"
            onClick={() => {
              handlePageChange(selectedPage + 1);
              setInputValue("");
            }}
          >
            &raquo;
          </button>
        </ul>
      )}
    </div>
  );
};

export default Home;
