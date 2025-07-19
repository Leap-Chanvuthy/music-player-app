import axios from "axios";

export async function getSongs() {
    try {
        const url = `https://api.deezer.com/search?q=brunomar`;
        const res = await axios.get(url);
        return res;
    }catch (error){
        console.log("Error fetching music :" , error);
    }
}
