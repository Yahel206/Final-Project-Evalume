
import React, { createContext } from "react";
import { useState, useEffect } from "react";

export const EvalueContext = createContext();
export default function EvalueContextProvider({ children }) {

  const [API, setAPI] = useState({
    // evaluationApi: "https://localhost:7079/userNum/evalu_Part_Type?userNum=",
    evaluationApi: "https://proj.ruppin.ac.il/cgroup47/prod/userNum/evalu_Part_Type?userNum=", //server
    // apiEvaluationQues: "https://localhost:7079/EvaluationAnswers",
    apiEvaluationQues: "https://proj.ruppin.ac.il/cgroup47/prod/EvaluationAnswers", //server
    // apiUserUrl: "https://localhost:7079/api/Employee",
    apiUserUrl: "https://proj.ruppin.ac.il/cgroup47/prod/api/Employee", //server
    // apiDeprUrl: "https://localhost:7079/api/Department",
    apiDeprUrl: "https://proj.ruppin.ac.il/cgroup47/prod/api/Department", //server
    // apiPutUserUrl: "https://localhost:7079/userEmail/is_Active/",
    apiPutUserUrl: "https://proj.ruppin.ac.il/cgroup47/prod/userEmail/is_Active/", //server
    // apiQuestionrUrl: "https://localhost:7079/api/Question",
    apiQuestionrUrl: "https://proj.ruppin.ac.il/cgroup47/prod/api/Question", //server
    // apinewEvaluationQues: "https://localhost:7079/api/Rel_Questions_EvaluQues",
    apinewEvaluationQues: "https://proj.ruppin.ac.il/cgroup47/prod/api/Rel_Questions_EvaluQues", //server
    // apiQuestionnaire: "https://localhost:7079/quesType/roleGroup_Type?quesType=",
    apiQuestionnaire: "https://proj.ruppin.ac.il/cgroup47/prod/quesType/roleGroup_Type?quesType=", //server
    // apiQuestionnaireQuestiones: "https://localhost:7079/questionnaireNum?questionnaireNum=",
    apiQuestionnaireQuestiones: "https://proj.ruppin.ac.il/cgroup47/prod/questionnaireNum?questionnaireNum=", //server
    // apiUserUrllogin: "https://localhost:7079/userEmail/userpassword?",
    apiUserUrllogin: "https://proj.ruppin.ac.il/cgroup47/prod/userEmail/userpassword?", //server
    // apiGetAllGoals: "https://localhost:7079/api/Goal",
    apiGetAllGoals: "https://proj.ruppin.ac.il/cgroup47/prod/api/Goal", //server
    // apiPostFinishAll: "https://localhost:7079/EvaluationSummeryAnswers",
    apiPostFinishAll: "https://proj.ruppin.ac.il/cgroup47/prod/EvaluationSummeryAnswers", //server
    // apiGetEmployeeStatus: "https://localhost:7079/userNum?userNum=",
    apiGetEmployeeStatus: "https://proj.ruppin.ac.il/cgroup47/prod/userNum?userNum=", //
    // apiGoalsEmployee: "https://localhost:7079/userManager?userManager=",
    apiGoalsEmployee: "https://proj.ruppin.ac.il/cgroup47/prod/userManager?userManager=", //server

  });

  //   const InitNotesContext = [ 
  //     {
  //         "id": 1,
  //         "title": "Note 1",
  //         "description":"Do presentation",
  //         "category":"Work"
  //       },
  //       {
  //         "id": 2,
  //         "title": "Note 2",
  //         "description":"Call Noa",
  //         "category":"Work"

  //       }, 
  //      {
  //         "id": 3,
  //         "title": "Note 3",
  //         "description":"Call Yarden",
  //         "category":"Work"

  //       },
  //       {
  //         "id": 4,
  //         "title": "Note 4",
  //         "description":"Send Email",
  //         "category":"Personal"

  //       }
  // ]


  //   const [notesArrContext, SetNotesArrContext] = useState(InitNotesContext);
  //   const InitCategoryArrContext = [ "Work", "Personal", "Ideas","Lists"]
  //   const [CategoryArrContext, SetCategoryArrContext] = useState(InitCategoryArrContext)
  //   const [currentCat, setCurrentCat] = useState("")
  const [chosenEmployee, setChosenEmployee] = useState("") //need to set to loacl storage beacuse it is not saved when refreshing

  useEffect(() => {
    const exisiting = localStorage.getItem("chosenEmployee");
    if (exisiting === null && chosenEmployee !== undefined || (exisiting !== null && chosenEmployee !== undefined && exisiting !== chosenEmployee)) {
      localStorage.setItem("chosenEmployee", JSON.stringify(chosenEmployee)); // Set chosenEmployee details in local storage
    }
    if (exisiting !== null && chosenEmployee === "") {

      setChosenEmployee(JSON.parse(exisiting));
    }
  }, [chosenEmployee])

  const values = {
    API,
    setAPI,
    chosenEmployee,
    setChosenEmployee
  }

  return (
    <EvalueContext.Provider value={values}>
      {children}
    </EvalueContext.Provider>
  )

}




