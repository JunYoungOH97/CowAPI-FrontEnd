import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export const NoticeWritePage = () => {
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
                url: '/server/admin/notices/notice',
                method: 'POST',
                headers: {
                    "Authorization" : "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJVc2VyIiwiaWF0IjoxNjU1Mzc5OTk3LCJleHAiOjE2NTU0NjYzOTd9.cRaSS-I14YjAlpN2jkmaq3JD31yt4VY0hZP9wsdagasCIjiRvPYM9SdvD458jMJj_MR3CmTrxIsCElK4KEUkuw",
                    "Content-Type" : "application/json"
                },
                data: req,
            }).then((res) => console.log(res));
        };

        postQnA();
        navigator("/notices");
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
    );

};