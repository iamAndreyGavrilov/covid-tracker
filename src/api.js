import axios from "axios";
export const fetchCovidData = async () => {
  try {
    const res = await axios.get("https://api.covid19api.com/summary");
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
