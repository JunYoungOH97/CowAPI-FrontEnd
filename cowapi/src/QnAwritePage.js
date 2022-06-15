import React, {useState, useEffect} from 'react';
import axios from 'axios';


export const QnAWrite = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');




    const handleClick = (e) => {
        setTitle(document.getElementById("title").value);
        setContent(document.getElementById("content").value);

        const postQnA = async () => {
            await axios({
                url: '/server/QnAs/QnA',
                method: 'Post',
                data: {
                    "title": title,
                    "content" : content
                },
            }).then((res) => console.log(res));
        };

        postQnA();
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
                <button type="button" onClick={handleClick}>작성하기</button>
            </form>
        </div>



        </div>
    )
};