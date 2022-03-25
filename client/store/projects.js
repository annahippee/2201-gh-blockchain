import axios from "axios";
import Campaign from "../../build/contracts/Campaign.json";

const SET_PROJECTS = "SET_PROJECTS";
const ADD_PROJECT = "ADD_PROJECT";

export const setProjects = (projects) => {
  return {
    type: SET_PROJECTS,
    projects,
  };
};

export const addProject = (newProject) => {
  return {
    type: ADD_PROJECT,
    newProject,
  };
};

export const fetchProjects = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/projects");
      dispatch(setProjects(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createProject = (newProject) => {
  return async (dispatch) => {
    try {
      console.log("====", newProject);
      const { data } = await axios.post("/api/projects", newProject);
      // uint _campaignId, uint _scientistId, address _projectAddress, string memory _title, uint _goalAmount, uint256 _startDate, uint256 _endDate
      const web3 = window.web3;
      const newCampaign = new web3.eth.Contract(Campaign.abi);
      const response = await newCampaign
        .deploy({
          data: Campaign.bytecode,
          arguments: [
            data.id,
            newProject.scientists[0],
            data.project_wallet_address,
            data.name,
            data.fundraising_goal,
            Date.parse(data.campaign_timeline_start),
            Date.parse(data.campaign_timeline_end),
          ],
        })
        .send({ from: newProject.address });
      await axios.put(`/api/projects/${data.id}`, {
        campaign_contract_address: response._address,
      });
      dispatch(addProject(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROJECTS:
      return action.projects;

    case ADD_PROJECT:
      return [...state, action.newProject];

    default:
      return state;
  }
}