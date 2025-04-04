import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const base_url = import.meta.env.VITE_BASE_API_URL

export const useIsAuth = ()=>{
    const navigate = useNavigate()
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const res = await axios.get(`${base_url}/api/auth/protectedPage`, {
            withCredentials: true
          });
  
          if (res.status === 401) {
            navigate('/');
          }
        } catch (err) {
          navigate('/');
        }
      };
  
      checkAuth()
  
    }, [navigate])

}

