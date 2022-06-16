import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const QnAWrite = () => {
    const navigator = useNavigate();

    const handleClick = (e) => {
        var t = document.getElementById("title").value;
        var c = document.getElementById("content").value
        
        var req = new Object({
            "title" : "",
            "content": ""
        });
        req.title = t;
        req.content = c;

        console.log(req);

        const postQnA = async () => {
            await axios({
                url: '/server/QnAs/QnA',
                method: 'POST',
                headers: {
                    "Authorization" : "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBZG1pbiIsImlhdCI6MTY1NTM2NjE1NiwiZXhwIjoxNjU1NDUyNTU2fQ.zwTRmztpdGFflnMKGXj4jV06NPguvVUDlEjfBA3aFD2_V-1y9hONzUV7WH7lr4UvnK3Mf3kr_DaFrcGT1rYe5w",
                    "Content-Type" : "application/json"
                },
                data: req,
            }).then((res) => console.log(res));
        };

        postQnA();
        navigator("/QnAs");
    }


    return (
        <div>
        <div>
            <form>
                Title : <input id='title'></input>
            </form>
        </div>

        <br></br>
        
        <div>
            <strong>Content : </strong>

            <form>
                <input textarea="true" id='content'></input>            
            </form>
            
        <br></br>


            <form>
                <button onClick={handleClick}>작성하기</button>
            </form>
        </div>
        </div>
    )
};