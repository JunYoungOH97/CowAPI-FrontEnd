import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export const QnAOnePage = () => {
  const [oneQnA, setOneQnA] = useState('');
  const [writeUser, setWriteUser] = useState('');

  const [isOnlyRead, setIsOnlyRead] = useState('');
  
  const location = useLocation();

  const QnAId = location.state.QnAId;

  const navigator = useNavigate();


  useEffect(() => {
    setIsOnlyRead(true);

    console.log(QnAId);
    
    const getQnA = async (QnAId) => {
      await axios({
        url: `/server/QnAs/${QnAId}`,
        method: 'GET',
        headers: {
          "Authorization" : "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBZG1pbiIsImlhdCI6MTY1NTM2NjE1NiwiZXhwIjoxNjU1NDUyNTU2fQ.zwTRmztpdGFflnMKGXj4jV06NPguvVUDlEjfBA3aFD2_V-1y9hONzUV7WH7lr4UvnK3Mf3kr_DaFrcGT1rYe5w",
        },
        }).then((res) => {console.log(res); setOneQnA(res.data); setWriteUser(res.data.userDto.email)});
    };

    getQnA(QnAId);
  }, []);


  const handleUpdate = (e) => {

    if(isOnlyRead) {
      setIsOnlyRead(false);
    }

    else {
      var content = document.getElementById("content").value;

      var req = new Object({
        "id" : QnAId,
        "content" : content
      });

      console.log(req);

      const updateQnA = async () => {
        await axios({
            url: '/server/QnAs/QnA',
            method: 'PUT',
            headers: {
                "Authorization" : "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBZG1pbiIsImlhdCI6MTY1NTM2NjE1NiwiZXhwIjoxNjU1NDUyNTU2fQ.zwTRmztpdGFflnMKGXj4jV06NPguvVUDlEjfBA3aFD2_V-1y9hONzUV7WH7lr4UvnK3Mf3kr_DaFrcGT1rYe5w",
                "Content-Type" : "application/json"
              },
            data: req,
        }).then((res) => console.log(res));
      };

      updateQnA();
    };

};

  const handleDelete = (e) => {
    var req = new Object({
      "id" : QnAId
    });

    const deleteQnA = async () => {
      await axios({
        url: '/server/QnAs/QnA',
        method: 'DELETE',
        headers: {
            "Authorization" : "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBZG1pbiIsImlhdCI6MTY1NTM2NjE1NiwiZXhwIjoxNjU1NDUyNTU2fQ.zwTRmztpdGFflnMKGXj4jV06NPguvVUDlEjfBA3aFD2_V-1y9hONzUV7WH7lr4UvnK3Mf3kr_DaFrcGT1rYe5w",
            "Content-Type" : "application/json"
          },
        data: req,
    }).then((res) => console.log(res));
    };

    deleteQnA();
    navigator("/QnAs");
  }

  return (
    <div>
      <div>
        <p>
          <strong>Title: </strong> <span>{oneQnA.title}</span>
        </p>
      </div>

      <div>
        <p>
        <strong>작성자 : </strong> <span> {writeUser} </span>
        </p>

        <p>
        <strong>최신날짜 : </strong> <span>{oneQnA.updatedDate}</span>
        </p>

      </div>

      <div>
        <p>
          <strong>Content : </strong>
        </p>
        <textarea placeholder={oneQnA.content} readOnly={isOnlyRead} id="content"></textarea>
      </div>

      
      <form>
          <button type="button" onClick={handleUpdate}>수정하기</button>
          <button type="button" onClick={handleDelete}>삭제하기</button>
      </form>

    </div>

  );
};