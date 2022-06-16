import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export const Notice = (props) => {
    const [Notices, setNotices] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigator = useNavigate();
    const location = useLocation();

    function NoticeOne({ notice }) {
        return (
            <tr>
                <td onClick={onClick}>{notice.id}</td>
                <td>{notice.title}</td>
                <td>{notice.userDto.email}</td>
                <td>{notice.updatedDate}</td>
            </tr>
        );
    };

    const onClick = (e) => {
        const index = e.target.innerHTML;
        navigator(`/notices/${index}`, { state : { noticeId : index } });
    };


    useEffect(() => {
        setError(null);
        setNotices(null);
        setLoading(true);

        if(location.state == null) {
            var pageNumber = JSON.parse(props.state).page
        }
        else {
            var pageNumber = location.state.page
        }


        const getNotices = async (pageNumber) => {
            await axios({
                url: `/server/user/notices/notice/page?page=${pageNumber}`,
                method: 'GET',
                headers: {
                    "Authorization" : "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBZG1pbiIsImlhdCI6MTY1NTM2NjE1NiwiZXhwIjoxNjU1NDUyNTU2fQ.zwTRmztpdGFflnMKGXj4jV06NPguvVUDlEjfBA3aFD2_V-1y9hONzUV7WH7lr4UvnK3Mf3kr_DaFrcGT1rYe5w",
                  },
            }).then((res) => {console.log(res); setNotices(res.data.noticeDtoList)});

            setLoading(false);
        };

        try {
            getNotices(pageNumber);
        } catch (err) {
            setError(true);
            console.log(err);
        }

    }, []);

    const pagenation = (e) => {
        const pageNumber = e.target.innerHTML
        
        navigator(`/notices/page/${pageNumber}`, { state : { page : pageNumber } });
    }

    const handleClick = () => {
        navigator("/notices/writePage")
    }

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!Notices) return <div>null</div>;


    return (
        <div>
            <h1> Notice </h1>
            
            <table>
                <thead>
                    <tr>
                        <th colSpan="4">Notice List</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>index</td>
                        <td>title</td>
                        <td>user</td>
                        <td>updated time</td>
                    </tr>

                    {Notices.map((notice) => (
                        <NoticeOne notice={notice} key={notice.id} />
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