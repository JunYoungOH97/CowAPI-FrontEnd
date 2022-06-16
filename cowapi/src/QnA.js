import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export const QnA = (props) => {
    const [QnAs, setQnAs] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigator = useNavigate();
    const location = useLocation();

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
        const index = e.target.innerHTML;
        navigator(`/QnAs/${index}`, { state : { QnAId : index } });
    };

    const pagenation = (e) => {
        const pageNumber = e.target.innerHTML
        
        navigator(`/QnAs/page/${pageNumber}`, { state : { page : pageNumber } });
    }

    useEffect(() => {
        setError(null);
        setQnAs(null);
        setLoading(true);
  

        if(location.state == null) {
            var pageNumber = JSON.parse(props.state).page
        }
        else {
            var pageNumber = location.state.page
        }

        console.log(pageNumber);

        const getQnAs = async (pageNumber) => {
            await axios({
                url: `/server/QnAs/QnA/page?page=${pageNumber}`,
                method: 'GET',
            }).then((res) => {console.log(res); setQnAs(res.data.qnADtoList)});
            setLoading(false);
        };

        getQnAs(pageNumber);

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
            <button >
            &lt;
            </button>

        {Array(10)
          .fill()
          .map((_, i) => (
                <button type = 'button' key={i + 1} onClick={pagenation}>
                {i + 1}
                </button>
            ))}

            <button>
                &gt;
            </button>

        </form>

        <form>
          <button type="button" onClick={handleClick}>새 QnA 작성</button>
        </form>

        </div>
    );
};