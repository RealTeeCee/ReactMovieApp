import { useCallback, useState } from "react";
//tạo một hook custom để fetch data để sử dụng lại nhiều lần trong các component cần fetch data từ api

//const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=b5a3ad3898299a6668f4d42b2a86f2c5";
//const API_KEY = 'b5a3ad3898299a6668f4d42b2a86f2c5';
const useHttp = () => {
  //const requestConfig = '/movie/popular?api_key=b5a3ad3898299a6668f4d42b2a86f2c5';
  //định trạng thái khi có lỗi kết nối
  const [error, setError] = useState(null);
  //sữ dụng callnack để dùng bất đồng bộ khi đợi kết quả trả về (status: successed hay error)
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setError(null);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3${requestConfig.url}`
      );
      if (!res.ok) {
        throw new Error("Request failed!");
      }
      const data = await res.json();
      applyData(data);
    } catch (err) {
      setError(err);
    }
  }, []);
  return {
    error,
    sendRequest,
  };
};

export default useHttp;