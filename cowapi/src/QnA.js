import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const QnA = () => {
    const [QnAs, setQnAs] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigator = new useNavigate();

    function QnAOne({ qna }) {
        return (
        <tr>
                <td onClick={onClick}>{qna.id}</td>
                <td>{qna.title}</td>
                <td>{qna.userDto.email}</td>
                <td>{qna.updatedDate}</td>
        </tr>
        );
    };

    const onClick = (e) => {
        console.log(e.target.innerHTML);
        const index = e.target.innerHTML;
        navigator(`/QnAs/${index}`);
    };

    useEffect(() => {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        setQnAs(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);

        const getQnAs = async () => {
        await axios({
            url: '/QnAs/QnA/page?page=1',
            method: 'GET',
            baseURL: "server"
        }).then((res) => {console.log(res); setQnAs(res.data.qnADtoList)});
        setLoading(false);
        };

        getQnAs();
    }, []);


    const handleClick = () => {
        navigator("/QnAs/writePage")
    }
    
    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!QnAs) return null;

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th colSpan="4">QnA List</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>index</td>
                        <td>title</td>
                        <td>user</td>
                        <td>updated time</td>
                    </tr>

                    {QnAs.map((qna) => (
                        <QnAOne qna={qna} key={qna.id} />
                    ))}

                </tbody>
            </table>


        <form>
          <button type="button" onClick={handleClick}>새 QnA 작성</button>
        </form>

        </div>
    );
};