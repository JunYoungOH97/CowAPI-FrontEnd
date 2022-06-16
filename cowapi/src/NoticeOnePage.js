import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export const NoticeOnePage = () => {
    const [OneNotice, setOneNotice] = useState('');
    const [writeUser, setWriteUser] = useState('');
  
    const [isOnlyRead, setIsOnlyRead] = useState('');
    
    const location = useLocation();
  
    const noticeId = location.state.noticeId;
    

    const navigator = useNavigate();

    useEffect(() => {
        setIsOnlyRead(true);

        console.log(noticeId);
        
        const getNotice = async (noticeId) => {
          await axios({
            url: `/server/user/notices/notice?noticeId=${noticeId}`,
            method: 'GET',
            headers: {
              "Authorization" : "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBZG1pbiIsImlhdCI6MTY1NTM2NjE1NiwiZXhwIjoxNjU1NDUyNTU2fQ.zwTRmztpdGFflnMKGXj4jV06NPguvVUDlEjfBA3aFD2_V-1y9hONzUV7WH7lr4UvnK3Mf3kr_DaFrcGT1rYe5w",
            },
            }).then((res) => {console.log(res); setOneNotice(res.data); setWriteUser(res.data.userDto.email)});
        };
    
        getNotice(noticeId);
      }, []);


      const handleUpdate = (e) => {

        if(isOnlyRead) {
          setIsOnlyRead(false);
        }
    
        else {
          var content = document.getElementById("content").value;
    
          var req = new Object({
            "id" : noticeId,
            "content" : content
          });
    
          console.log(req);
    
          const updateQnA = async () => {
            await axios({
                url: '/server/admin/notices/notice',
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
        // var req = new Object({
        //   "id" : noticeId
        // });
    
        const deleteQnA = async () => {
          await axios({
            url: `/server/admin/notices/notice?noticeId=${noticeId}`,
            method: 'DELETE',
            headers: {
                "Authorization" : "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBZG1pbiIsImlhdCI6MTY1NTM2NjE1NiwiZXhwIjoxNjU1NDUyNTU2fQ.zwTRmztpdGFflnMKGXj4jV06NPguvVUDlEjfBA3aFD2_V-1y9hONzUV7WH7lr4UvnK3Mf3kr_DaFrcGT1rYe5w",
                "Content-Type" : "application/json"
              },
            // data: req,
        }).then((res) => console.log(res));
        };
    
        deleteQnA();
        navigator("/notices");
      }

    return (
        <div>
        <div>
          <p>
            <strong>Title: </strong> <span>{OneNotice.title}</span>
          </p>
        </div>
  
        <div>
          <p>
          <strong>작성자 : </strong> <span> {writeUser} </span>
          </p>
  
          <p>
          <strong>최신날짜 : </strong> <span>{OneNotice.updatedDate}</span>
          </p>
  
        </div>
  
        <div>
          <p>
            <strong>Content : </strong>
          </p>
          <textarea placeholder={OneNotice.content} readOnly={isOnlyRead} id="content"></textarea>
        </div>
  
        
        <form>
            <button type="button" onClick={handleUpdate}>수정하기</button>
            <button type="button" onClick={handleDelete}>삭제하기</button>
        </form>
  
      </div>
    )

};