import React, {useState} from 'react';
import axios from 'axios';

export const AI = () => {
  const [files, setFiles] = useState('');
  const [response, setResponse] = useState({category : "모델이 분류중 입니다.", score : "모델이 분류중 입니다."});
  const [imageSrc, setImageSrc] = useState('');

  const onLoadFile = (e) => {
    const file = e.target.files;
    console.log(file);
    setFiles(file);

    const reader = new FileReader();
    reader.readAsDataURL(file[0]);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const handleClick = async (e) => {
    const formdata = new FormData();
    formdata.append("images", files[0]);

    try {
      await axios({
        url: '/Admin/ai/category',
        method: 'POST',
        data: formdata,
        headers: {
          'content-type':"multipart/form-data",
          "Authorization" : "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBZG1pbiIsImlhdCI6MTY1NTE3NDAwMiwiZXhwIjoxNjU1MjYwNDAyfQ.weoEKBhRwwDXXre1WivCZNXeM9YaaKlB2EyDHOX03ql1B7n-kzdKgaMoUh_EGxM3xlMMR0hwffwNRqW-qoNHXA"},
        baseURL: "server"
      }).then((res) => {
        console.log(res.data);
        setResponse(res.data);
      })
    }

    catch(e) {
      console.log(e);
    }
  };


  return (
      <div>
        <h1>AI category 서비스</h1>

        <br></br>

        <h2>입력</h2>
        <div className="preview">
          {imageSrc && <img src={imageSrc} alt="preview-img" />}
        </div>

        <form>
          <input type="file" accept="image/*" onChange={onLoadFile} />
        </form>

        <form>
          <button type="button" onClick={handleClick}>보내기</button>
        </form>

        <br></br>


        <h2>결과</h2>
        <table>
          <thead>
              <tr>
                  <th colSpan="2">카테고리 결과</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>Category</td>
                  <td>Accuracy</td>
              </tr>
            <tr>
                  <td>{response.category}</td>
                  <td>{response.score}</td>
            </tr>
          </tbody>
      </table>
    </div>
  );
}