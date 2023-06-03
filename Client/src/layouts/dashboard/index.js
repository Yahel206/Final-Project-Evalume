
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import Projects from "layouts/dashboard/components/Projects";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import { useEffect, useState, useContext } from "react";
import { useMaterialUIController, setDirection } from "context";
import reportsGoalsData from "./data/reportsGoalsData";
import { EvalueContext } from "context/evalueVariables";
import { MainStateContext } from "App";
import { CollectionsBookmarkOutlined } from "@mui/icons-material";
import ApiFetcher from "components/ApiFetcher";

// import BarChartData from "./data/reportsBarChartData";
const jsonArray = [
  {
    "quesGroup": 1,
    "quesGroup_Desc": "שירותיות",
    "parts": [
      {
        "depNum": 1,
        "depName": "משאבי אנוש וביטחון",
        "avg_Answers": 5
      },
      {
        "depNum": 2,
        "depName": "שיווק ומכירות",
        "avg_Answers": 4
      },
      {
        "depNum": 102,
        "depName": "תפעול",
        "avg_Answers": 5
      }
    ]
  },
  {
    "quesGroup": 2,
    "quesGroup_Desc": "מקצועיות ואיכות בעבודה",
    "parts": [
      {
        "depNum": 1,
        "depName": "משאבי אנוש וביטחון",
        "avg_Answers": 5
      },
      {
        "depNum": 2,
        "depName": "שיווק ומכירות",
        "avg_Answers": 4
      },
      {
        "depNum": 102,
        "depName": "תפעול",
        "avg_Answers": 5
      }
    ]
  }, {

    "quesGroup": 3,
    "quesGroup_Desc": "יחסי עבודה , תקשורת ועבודת צוות",
    "parts": [
      {
        "depNum": 1,
        "depName": "משאבי אנוש וביטחון",
        "avg_Answers": 5
      },
      {
        "depNum": 2,
        "depName": "שיווק ומכירות",
        "avg_Answers": 4
      },
      {
        "depNum": 102,
        "depName": "תפעול",
        "avg_Answers": 5
      }
    ]
  }, {

    "quesGroup": 4,
    "quesGroup_Desc": "יוזמה ואחריות",
    "parts": [
      {
        "depNum": 1,
        "depName": "משאבי אנוש וביטחון",
        "avg_Answers": 5
      },
      {
        "depNum": 102,
        "depName": "תפעול",
        "avg_Answers": 5
      }
    ]
  }, {

    "quesGroup": 5,
    "quesGroup_Desc": "משמעת",
    "parts": [
      {
        "depNum": 1,
        "depName": "משאבי אנוש וביטחון",
        "avg_Answers": 5
      },
      {
        "depNum": 2,
        "depName": "שיווק ומכירות",
        "avg_Answers": 4
      },
      {
        "depNum": 102,
        "depName": "תפעול",
        "avg_Answers": 5
      }
    ]
  }, {

    "quesGroup": 6,
    "quesGroup_Desc": "מיומנויות ניהול",
    "parts": [
      {
        "depNum": 1,
        "depName": "משאבי אנוש וביטחון",
        "avg_Answers": 5
      },
      {
        "depNum": 2,
        "depName": "שיווק ומכירות",
        "avg_Answers": 4
      },
      {
        "depNum": 102,
        "depName": "תפעול",
        "avg_Answers": 5
      }
    ]
  }
]

const goals1= 
[
  {
    "goalStatus": "בוצע",
    "goalNum": 1,
    "goalName": "סגירת תקציבים לשנת 2023",
    "num_of_statuses_byGoal": 1
  },
  {
    "goalStatus": "בתהליך",
    "goalNum": 1,
    "goalName": "סגירת תקציבים לשנת 2023",
    "num_of_statuses_byGoal": 2
  },
 {
    "goalStatus": "חדש",
    "goalNum": 1,
    "goalName": "סגירת תקציבים לשנת 2023",
    "num_of_statuses_byGoal": 0
  },
  {
    "goalStatus": "בוצע",
    "goalNum": 2,
    "goalName": "מעבר למחסן החדש",
    "num_of_statuses_byGoal": 1
  },
   {
    "goalStatus": "בתהליך",
    "goalNum": 2,
    "goalName": "מעבר למחסן החדש",
    "num_of_statuses_byGoal": 0,
   },
  {
    "goalStatus": "חדש",
    "goalNum": 2,
    "goalName": "מעבר למחסן החדש",
    "num_of_statuses_byGoal": 0
  },

  {
    "goalStatus": "בוצע",
    "goalNum": 3,
    "goalName": "מיפוי ארגזים",
    "num_of_statuses_byGoal": 1
  },
  {
    "goalStatus": "בתהליך",
    "goalNum": 3,
    "goalName": "מיפוי ארגזים",
    "num_of_statuses_byGoal": 0
  },
 {
    "goalStatus": "חדש",
    "goalNum": 3,
    "goalName": "מיפוי ארגזים",
    "num_of_statuses_byGoal": 0
  },
  {
    "goalStatus": "בוצע",
    "goalNum": 108,
    "goalName": "הדרכת בטיחות",
    "num_of_statuses_byGoal": 0
  },
  {
    "goalStatus": "בתהליך",
    "goalNum": 108,
    "goalName": "הדרכת בטיחות",
    "num_of_statuses_byGoal": 0
  },
  {
    "goalStatus": "חדש",
    "goalNum": 108,
    "goalName": "הדרכת בטיחות",
    "num_of_statuses_byGoal": 1
  },
  {
    "goalStatus": "בוצע",
    "goalNum": 111,
    "goalName": "כנס בטיחות שנתי",
    "num_of_statuses_byGoal": 4
  },
  {
    "goalStatus": "בתהליך",
    "goalNum": 111,
    "goalName": "כנס בטיחות שנתי",
    "num_of_statuses_byGoal": 3
  },
  {
    "goalStatus": "חדש",
    "goalNum": 111,
    "goalName": "כנס בטיחות שנתי",
    "num_of_statuses_byGoal": 1
  }
]
function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'ציון ממוצע',
        data: [],
      },
    ],
  });
  const [, dispatch] = useMaterialUIController();

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");
    return () => setDirection(dispatch, "ltr");
  }, []);
  const [selectedValueGraph1, setselectedValueGraph1] = useState("שירותיות"); // Initialize the selected value state
  const [selectedValueGraph2, setselectedValueGraph2] = useState(''); // Initialize the selected value state
  const { API, setDepState } = useContext(EvalueContext);
  const { mainState, setMainState } = useContext(MainStateContext);
  const [year, setYear] = useState(new Date().getFullYear());
  const [dataTable, setDataTable] = useState([]);//bottom table
  const [error, setError] = useState(null);
  const [goals, setGoals] = useState(null);//goals
  const [totalAvg, setTotalAvg] = useState(null);//years
  const [avgQuestions, setAvgQuestions] = useState(null);//dep table

  //all API calls
  useEffect(() => {
    let isMounted = true;

    // Get the total questions avg answer for the last 5/6 years from the current year
    const getTotalAvg = async () => {
      try {
        const fetchedData = await ApiFetcher(API.apiAvgAnsByYears, "GET", null);
        if (isMounted) {
          console.log("success");
          console.log("getTotalAvg",fetchedData);
          setTotalAvg(fetchedData);
        }
      }
      catch (error) {
        if (isMounted) {
          setError(error);
          console.log(error);
        }
      }
    }
    getTotalAvg();

    // Get how many employees are in each part of the evaluation process for the current year soted by departments
    const getDataTable = async () => {
      try {
        const fetchedData = await ApiFetcher(API.apiEmployeeInEachPart, "GET", null);
        if (isMounted) {
          console.log("success");
          console.log("getDataTable",fetchedData);
          setDataTable(fetchedData);
        }
      }
      catch (error) {
        if (isMounted) {
          setError(error);
          console.log(error);
        }
      }
    }
    getDataTable();

    return () => {
      isMounted = false;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    // Get goals and their status details
    const getGolas = async () => {
      try {
        const fetchedData = await ApiFetcher(API.apiGoalsStatusBI + year, "GET", null);
        if (isMounted) {
          console.log("success");
          console.log("getGolas",fetchedData);
          setGoals(fetchedData);
        }
      }
      catch (error) {
        if (isMounted) {
          setError(error);
          console.log(error);
        }
      }
    }
    getGolas();

    // Get the questions avg answer according to the question group type
    const getAvgQuestions = async () => {
      try {
        const fetchedData = await ApiFetcher(API.apiQuesGroupDep + year, "GET", null);
        if (isMounted) {
          console.log("success");
          console.log("getAvgQuestions",fetchedData);
          setAvgQuestions(fetchedData);
        }
      }
      catch (error) {
        if (isMounted) {
          setError(error);
          console.log(error);
        }
      }
    }
    getAvgQuestions();

    return () => {
      isMounted = false;
    }
  }, [year]);


  const [goalchartData, setgoalChartData] = useState({
    labels: [],
    datasets: [],
  });

  const handleSelectChange1 = (event) => {
    setselectedValueGraph1(event.target.value);
  }

  useEffect(() => {
    // Find the selected item in the JSON array
    const selectedOption = jsonArray.find((option) => option.quesGroup_Desc === selectedValueGraph1);
    console.log(selectedOption)

    // Generate the chart data based on the selected option
    const newChartData = {
      labels: selectedOption?.parts.map((part) => part.depName) || [],
      datasets: [
        {
          label: selectedOption.quesGroup_Desc,
          data: selectedOption?.parts.map((part) => part.avg_Answers) || [],
        },
      ],
    };

    setChartData(newChartData);
    console.log(newChartData)
  }, [selectedValueGraph1]);


  const handleSelectChange2 = (event) => {
    setselectedValueGraph2(event.target.value);
  }
      useEffect(() => {
      const processedData = goals1.reduce((acc, curr, index) => {
        const { goalName, goalStatus, num_of_statuses_byGoal } = curr;
    
        if (!acc.labels.includes(goalName)) {
          acc.labels.push(goalName);
        }
    
        let dataset = acc.datasets.find((d) => d.label === goalStatus);
    
        if (!dataset) {
          dataset = {
            label: goalStatus,
            data: [],
            backgroundColor: getBackgroundColor(index),
          };
          acc.datasets.push(dataset);
        }
    
        dataset.data.push(num_of_statuses_byGoal);
    
        return acc;
      }, { labels: [], datasets: [] });
    
      setgoalChartData({
        labels: processedData.labels,
        datasets: processedData.datasets,
      });
    }, []);

    const getBackgroundColor = (index) => {
      const colors = [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
      ];
      return colors[index % colors.length];
    };

    
  return (
    <header>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsBarChart
                color="info"
                title={selectedValueGraph1}
                description="התפלגות לפי מחלקות"
                date="עודכן לאחרונה בתאריך 2.2.2023"
                chart={chartData}
              />

              <select value={selectedValueGraph1} onChange={handleSelectChange1}>
                <option value="שירותיות">שירותיות</option>
                {jsonArray.map((option, index) => (
                  <option key={option.quesGroup} value={option.quesGroup_Desc}>
                    {option.quesGroup_Desc}
                  </option>
                ))}
              </select>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="success"
                title={selectedValueGraph2}
                description="קצב השינוי לאורך השנים"
                date="עודכן לאחרונה בתאריך 2.2.2023"
                chart={sales}
              />

              <select value={selectedValueGraph2} onChange={handleSelectChange2}>
                <option value="">בחר מדד</option>
                {jsonArray.map((option) => (
                  <option key={option.quesGroup} value={option.quesGroup_Desc}>
                    {option.quesGroup_Desc}
                  </option>
                ))}
              </select>
            </MDBox>

          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <VerticalBarChart
                color="dark"
                title="סטטוס יעדים"
                description="כמות העובדים המשויכים ליעד וקצת התקדמות"
                chart={goalchartData}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Projects />
          </Grid>
          {/* <Grid item xs={12} md={6} lg={4}>
            <OrdersOverview />
          </Grid> */}
        </Grid>
      </MDBox>
    </header>
  );
}

export default Dashboard;
