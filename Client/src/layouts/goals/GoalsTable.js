import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import GoalsData from "./GoalsData";
import Collapse from '@mui/material/Collapse';
// Material Dashboard 2 React contexts
import { useMaterialUIController, setDirection } from "context";
import TableToolbarGoal from "./TableToolBarGoal";
import { Box, TablePagination, TableSortLabel } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { visuallyHidden } from "@mui/utils";
import { useDebounce } from "use-debounce";
import GoalItem from "./GoalItem";
import { MainStateContext } from "App";

const _goals = [
  {
    id: 1,
    goalId: "a",
    goalName: "קורס אקסל",
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  },
  {
    id: 2,
    goalId: "b",
    goalName: "קורס פריוריטי",
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  },
  {
    id: 3,
    goalId: "c",
    goalName: "קורס חשבשבת",
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  },
];

export default function GoalsTable() {
  const [, dispatch] = useMaterialUIController();
  const [tableHead, setTableHead] = useState(_tableHead);
  const [items, setItems] = useState([_goals]);
  const [goals, setGoals] = useState([_goals]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { mainState, setMainState } = useContext(MainStateContext);
  // const apiGoals = "https://localhost:7079/api/Goal/"

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);

  useEffect(() => {
    setItems(_goals);
  }, [_goals]);

  // bring all the goals of the employees under a manager
  // useEffect(() => {
  //   const abortController = new AbortController();
  //   console.log("ani");
  //   // console.log(myFormTypes.chosenForm);
  //   if (mainState.userType) {
  //     fetch(
  //       apiGoals + mainState.userNum,
  //       {
  //         method: "GET",
  //         headers: new Headers({
  //           "Content-Type": "application/json; charset=UTF-8",
  //           Accept: "application/json; charset=UTF-8",
  //         }),
  //         signal: abortController.signal,
  //       })
  //       .then(async (response) => {
  //         const data = await response.json();
  //         console.log(response);

  //         if (!response.ok) {
  //           // get error message from body or default to response statusText
  //           const error = (data && data.message) || response.statusText;
  //           return Promise.reject(error);
  //         }

  //         return data;
  //       })
  //       .then(
  //         (result) => {
  //           console.log("bani");
  //           console.log("success");
  //           setItems(result);
  //         },
  //         (error) => {
  //           if (error.name === "AbortError") return;
  //           console.log("err get=", error);
  //           throw error;
  //         }
  //       );
  //     return () => {
  //       abortController.abort();
  //       // stop the query by aborting on the AbortController on unmount
  //     };
  //   }
  // }, []);

  // handleSearch - start
  const [searchInput, setSearchInput] = useState("");
  const [searchDebounce] = useDebounce(searchInput, 500);
  useEffect(() => {
    handleSearch(searchDebounce);
  }, [searchDebounce]);

  const handleSearch = (value) => {
    setSearchInput(value);

    let sx = _goals.filter((item) =>
      `${item.goalName}`.toLowerCase().includes(value.toLowerCase())
    );

    setItems(value?.length > 0 ? sx : _goals);
  };
  // handleSearch - end
  const handleRemoveGoal = (goal) => {
    setGoals((i) => i.filter((item) => item.goalName !== goal.goalName));
    setItems((i) => i.filter((item) => item.goalName !== goal.goalName));

    setSearchInput("");
  };
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - items.length);

  return (
    <Paper sx={{ boxShadow: "none" }}>
      <TableToolbarGoal
        // Goals
        goals={_goals}
        setGoals={setGoals}
        setItems={setItems}
        // Search
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        //Table Head
        tableHead={tableHead}
        setTableHead={setTableHead}
      />

      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
          <TableHead>
            <TableRow>
              <TableCell align="right" width={40} />

              {tableHead.map((item) => {
                return (
                  item.show && (
                    <TableCell
                      key={item.id}
                      align={item.textAlign || "right"}
                      padding={item.disablePadding ? "none" : "normal"}
                      sx={{ fontWeight: 600 }}
                    >
                      {" "}
                      {item.label}
                    </TableCell>
                  )
                );
              })}

              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {items
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((goal, index) => (
                <GoalItem
                  key={index}
                  goal={goal}
                  goals={goals}
                  setGoals={setGoals}
                  setItems={setItems}
                  tableHead={tableHead}
                  onRemoveButtonClick={() => handleRemoveGoal(goal)}
                />
              ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={7} sx={{ textAlign: "center" }}>
                  {goals.length > 0
                    ? items.length <= 0 && "לא נמצאו רשומות מתאימות"
                    : "הרשימה ריקה, הוסף רשומות"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} מתוך ${count !== -1 ? count : `יותר מ ${to}`}`
        }
        labelRowsPerPage="מספר שורות להציג:"
      />
    </Paper>
  );
}

const _tableHead = [
  {
    id: "goalName",
    textAlign: "right",
    disablePadding: true,
    label: "שם יעד",
    show: true,
  },
];

    // <TableContainer component={Paper}>
    //   <Table aria-label="collapsible table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell />
    //         <TableCell>יעדים</TableCell>
    //         {/* <TableCell>אחוז השלמה</TableCell> */}
    //       </TableRow>
    //       <TableToolbarGoal/>
    //     </TableHead>
    //     <TableBody>
    //       {_goals.map((row) => (
    //         <GoalsData key={row.id} row={row} />
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
