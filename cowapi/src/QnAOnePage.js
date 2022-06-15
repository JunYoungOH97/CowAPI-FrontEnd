import React, {useState, useEffect} from 'react';
import axios from 'axios';

export const QnAOnePage = () => {
  const [oneQnA, setOneQnA] = useState('');
  const [writeUser, setWriteUser] = useState('');


  useEffect(() => {
    const getQnA = async () => {
      await axios({
        url: '/server/QnAs/1',
        method: 'GET',
        headers: {
          "Authorization" : "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyQGp1bnlvdW5nLmNvbSIsImlhdCI6MTY1NTI3Mjc2NiwiZXhwIjoxNjU1MzU5MTY2fQ.28TF9L0BtdSmcMk_Iq9v1IEDAtegVAn68Nwc2dHhZuyqQ9C-OP-qLli1A5V9u53ngn6dJD486xEgK-woRqea6Q",
        },
        }).then((res) => {console.log(res); setOneQnA(res.data); setWriteUser(res.data.userDto.email)});
    };

    getQnA();
  }, []);


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
        <textarea placeholder={oneQnA.content} readOnly></textarea>
      </div>

    </div>

  );
};